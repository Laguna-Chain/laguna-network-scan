import { useEffect, useState } from "react";
import getApi from "../libs/api";

export default function Validators() {
  const [validators, setValidators] = useState([]);

  useEffect(() => {
    let unsubscribeAll = null;

    const getConnectedPeers = async () => {
      const api = await getApi();
      try {
        unsubscribeAll = await api.rpc.system.peers((peers) => {
          const peersArr = peers.toHuman();
          // Validators are peers with role AUTHORITY
          const validatorPeers = peersArr.filter(
            (peer) => peer.roles === "AUTHORITY"
          );
          setValidators(validatorPeers);
        });
      } catch (error) {
        console.error();
      }
    };

    getConnectedPeers();
    return () => unsubscribeAll && unsubscribeAll();
  }, []);

  return (
    <div className="validators-container">
      <div className="d-flex justify-content-space-between">
        <div className="d-flex align-items-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 16C13.1 16 14 16.9 14 18C14 19.1 13.1 20 12 20C10.9 20 10 19.1 10 18C10 16.9 10.9 16 12 16ZM12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10ZM12 4C13.1 4 14 4.9 14 6C14 7.1 13.1 8 12 8C10.9 8 10 7.1 10 6C10 4.9 10.9 4 12 4ZM6 16C7.1 16 8 16.9 8 18C8 19.1 7.1 20 6 20C4.9 20 4 19.1 4 18C4 16.9 4.9 16 6 16ZM6 10C7.1 10 8 10.9 8 12C8 13.1 7.1 14 6 14C4.9 14 4 13.1 4 12C4 10.9 4.9 10 6 10ZM6 4C7.1 4 8 4.9 8 6C8 7.1 7.1 8 6 8C4.9 8 4 7.1 4 6C4 4.9 4.9 4 6 4ZM18 16C19.1 16 20 16.9 20 18C20 19.1 19.1 20 18 20C16.9 20 16 19.1 16 18C16 16.9 16.9 16 18 16ZM18 10C19.1 10 20 10.9 20 12C20 13.1 19.1 14 18 14C16.9 14 16 13.1 16 12C16 10.9 16.9 10 18 10ZM18 4C19.1 4 20 4.9 20 6C20 7.1 19.1 8 18 8C16.9 8 16 7.1 16 6C16 4.9 16.9 4 18 4Z"
              fill="#706CFF"
            />
          </svg>

          <h3 className="ml-3">Validators/Connected Peers</h3>
        </div>
        <a href="/validators" className="button small">
          All
        </a>
      </div>
      <div className="validators-table">
        <table className="table">
          <thead>
            <tr>
              <th>Validator</th>
              <th>Role</th>
              <th>Best #</th>
              <th>Best Hash</th>
            </tr>
          </thead>
          <tbody>
            {validators.map((validator) => (
              <tr key={validator.peerId}>
                <td className="">
                  {" "}
                  <span className="text-accent-purple">
                    {validator.peerId.slice(0, 10)}...
                  </span>
                </td>
                <td className="text-dark-white">{validator.roles}</td>
                <td className="text-dark-white">{validator.bestNumber}</td>
                <td className="text-accent-purple">{validator.bestHash}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
