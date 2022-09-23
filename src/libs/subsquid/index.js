import axios from "axios";
import config from "../../config";

const subSquidQuery = axios.create({
  baseURL: config.SUBSQUID_ARCHIVE_GRAPH_NODE,
});

const subSquidGraphServer = axios.create({
  baseURL: config.SUBSQUID_GRAPH_SERVER,
});

const chainQuery = axios.create({
  baseURL: config.CHAIN_QUERY_SERVER,
})

export { subSquidQuery, subSquidGraphServer, chainQuery };
