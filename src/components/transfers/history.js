import groupBy from "lodash.groupby";
import { useEffect, useState } from "react";
import { subSquidGraphServer } from "../../libs/subsquid";
import { useSubstrateState } from "../../libs/substrate";
import { getHistoryDateRange, roundToMinutes } from "../../utils";
import Chart from "../charts/bar-chart";
import InfoPlaceholder from "../info-placeholder";
import config from "../../config";

export default function TransfersHistory({ period, setPeriod }) {
  const { api } = useSubstrateState();

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    let isHistoryMounted = true;
    const getTransfers = async () => {
      // let chainInfo = await api.registry.getChainProperties();
      // chainInfo = chainInfo.toHuman();
      // const decimals = chainInfo.tokenDecimals[0];
      // const unit = chainInfo.tokenSymbol[0];

      const { lowerDateString, upperDateString } = getHistoryDateRange(period);

      const QUERY = `{
        transfers(where: {timestamp_lte: "${upperDateString}", timestamp_gte: "${lowerDateString}"}) {
          amount
          timestamp
        }
      }`;
      const { data } = await subSquidGraphServer.post("", {
        query: QUERY,
      });

      if (data.errors) {
        console.error(data.errors);
      } else {
        let transfers = data.data.transfers;

        transfers = transfers.map((t) => ({
          ...t,
          groupTimestamp: roundToMinutes(t.timestamp, period),
          value: t.amount,
          // hex: hexToBigInt(t.data.value),
        }));

        const groupedTransfers = groupBy(transfers, (a) => a.groupTimestamp);

        let dataset = [];

        for (let date in groupedTransfers) {
          let totAmt = 0;
          for (let inVal in groupedTransfers[date]) {
            totAmt += Number(groupedTransfers[date][inVal].amount);
          }
          dataset.push({
            timestamp: date, // new Date(date).toISOString(),
            totalNumber: groupedTransfers[date].length,
            totalAmount: (totAmt / config.TOKEN_VALUE).toFixed(4),
            // totalAmount: groupedTransfers[date].reduce(
            //   (prev, cur) => (prev.value += cur.value)
            // ),
          });
        }
        dataset = dataset.sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );
        if (isHistoryMounted) {
          setChartData(dataset);
        }
      }
    };

    getTransfers();
    return () => (isHistoryMounted = false);
  }, [api.registry, period]);

  return (
    <div className="bordered-content-box extrinsics-history mb-40">
      <h3 className="text-white">Transfers history</h3>
      <div>
        <span
          className={`button tiny pointer ${period === "1hr" ? "active" : ""}`}
          onClick={() => setPeriod("1hr")}
        >
          1H
        </span>
        <span
          className={`button tiny pointer ${period === "6hr" ? "active" : ""}`}
          onClick={() => setPeriod("6hr")}
        >
          6H
        </span>
        <span
          className={`button tiny pointer ${period === "1dy" ? "active" : ""}`}
          onClick={() => setPeriod("1dy")}
        >
          1D
        </span>
      </div>
      {chartData.length > 0 ? (
        <Chart
          chartData={chartData}
          hasInvert
          invertProp="total"
          dataProp={{ regular: "totalAmount", invert: "totalNumber" }}
        />
      ) : (
        // <InfoPlaceholder
        //   text={`Sorry we couldn't find transfers in the last ${period}`}
        //   isBare
        // />
        <InfoPlaceholder
          text={`Please wait data is being fetched`}
          isBare
        />
      )}
    </div>
  );
}
