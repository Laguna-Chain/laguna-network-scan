import { useEffect, useState } from "react";
import getApi from "../libs/api";

export default function Blocks() {
  const [latestBlocks, setLatestBlocks] = useState([]);

  useEffect(() => {
    const getBlocks = async () => {
      const api = await getApi();
      const signedBlock = api.rpc.chain.getBlock();
      // const validators = await api.query.session.validators();

      console.log(signedBlock);
    };
    getBlocks();
  }, []);
  return (
    <div className="blocks-container">
      <div className="transfers">
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
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.5602 1.4963C17.8385 1.21804 18.2896 1.21803 18.5679 1.49627L22.5036 5.43173C22.6374 5.56549 22.7125 5.74694 22.7123 5.93611C22.7122 6.12527 22.6368 6.30661 22.5028 6.44016L18.5671 10.3637C18.2884 10.6415 17.8373 10.6408 17.5595 10.3621C17.2817 10.0835 17.2824 9.63232 17.561 9.35451L20.9914 5.9348L17.5603 2.50393C17.282 2.22569 17.282 1.77456 17.5602 1.4963Z"
                fill="#706CFF"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.28748 5.93418C2.28748 5.54068 2.60647 5.22168 2.99998 5.22168H22C22.3935 5.22168 22.7125 5.54068 22.7125 5.93418C22.7125 6.32768 22.3935 6.64668 22 6.64668H2.99998C2.60647 6.64668 2.28748 6.32768 2.28748 5.93418Z"
                fill="#706CFF"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.44045 12.6395C7.71819 12.9183 7.71738 13.3694 7.43863 13.6472L4.00849 17.0649L7.43956 20.4963C7.7178 20.7746 7.71777 21.2257 7.43951 21.504C7.16125 21.7822 6.71012 21.7822 6.43188 21.5039L2.49614 17.5678C2.36237 17.434 2.2873 17.2525 2.28748 17.0633C2.28765 16.8741 2.36306 16.6928 2.49707 16.5593L6.43282 12.6377C6.71157 12.36 7.1627 12.3608 7.44045 12.6395Z"
                fill="#706CFF"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.28748 17.0658C2.28748 16.6723 2.60647 16.3533 2.99998 16.3533H22C22.3935 16.3533 22.7125 16.6723 22.7125 17.0658C22.7125 17.4593 22.3935 17.7783 22 17.7783H2.99998C2.60647 17.7783 2.28748 17.4593 2.28748 17.0658Z"
                fill="#706CFF"
              />
            </svg>

            <h3 className="ml-3">Transfers</h3>
          </div>
          <a href="/transfers" className="button small">
            All
          </a>
        </div>
        <div>
          <table className="table">
            <tbody>
              <tr>
                <td className="text-large">
                  <div>
                    Extrinsic index#{" "}
                    <span className="text-accent-purple">787,89,21</span>
                  </div>
                  <div>
                    <span className="text-dark-white text-small">From</span>{" "}
                    <span className="text-accent-purple text-small">
                      0xcd2d8b2cb...
                    </span>{" "}
                    <span className="text-dark-white text-small">To</span>{" "}
                    <span className="text-accent-purple text-small">
                      0xcd2d8b2cb...
                    </span>
                  </div>
                </td>
                <td>
                  <div className="text-dark-white text-small">4 secs ago</div>
                  <div className="text-accent-purple text-small">3,5 PEAQ</div>
                </td>
              </tr>
              <tr>
                <td className="text-large">
                  <div>
                    Extrinsic index#{" "}
                    <span className="text-accent-purple">787,89,21</span>
                  </div>
                  <div>
                    <span className="text-dark-white text-small">From</span>{" "}
                    <span className="text-accent-purple text-small">
                      0xcd2d8b2cb...
                    </span>{" "}
                    <span className="text-dark-white text-small">To</span>{" "}
                    <span className="text-accent-purple text-small">
                      0xcd2d8b2cb...
                    </span>
                  </div>
                </td>
                <td>
                  <div className="text-dark-white text-small">4 secs ago</div>
                  <div className="text-accent-purple text-small">3,5 PEAQ</div>
                </td>
              </tr>
              <tr>
                <td className="text-large">
                  <div>
                    Extrinsic index#{" "}
                    <span className="text-accent-purple">787,89,21</span>
                  </div>
                  <div>
                    <span className="text-dark-white text-small">From</span>{" "}
                    <span className="text-accent-purple text-small">
                      0xcd2d8b2cb...
                    </span>{" "}
                    <span className="text-dark-white text-small">To</span>{" "}
                    <span className="text-accent-purple text-small">
                      0xcd2d8b2cb...
                    </span>
                  </div>
                </td>
                <td>
                  <div className="text-dark-white text-small">4 secs ago</div>
                  <div className="text-accent-purple text-small">3,5 PEAQ</div>
                </td>
              </tr>
              <tr>
                <td className="text-large">
                  <div>
                    Extrinsic index#{" "}
                    <span className="text-accent-purple">787,89,21</span>
                  </div>
                  <div>
                    <span className="text-dark-white text-small">From</span>{" "}
                    <span className="text-accent-purple text-small">
                      0xcd2d8b2cb...
                    </span>{" "}
                    <span className="text-dark-white text-small">To</span>{" "}
                    <span className="text-accent-purple text-small">
                      0xcd2d8b2cb...
                    </span>
                  </div>
                </td>
                <td>
                  <div className="text-dark-white text-small">4 secs ago</div>
                  <div className="text-accent-purple text-small">3,5 PEAQ</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="latest-blocks">
        <div className="d-flex justify-content-space-between align-items-center">
          <div className="d-flex align-items-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.372 5.65874L13.3765 1.6214C12.5241 1.12687 11.4767 1.12636 10.6243 1.62086L10.6233 1.6214L3.62509 5.66036L3.6234 5.66135C3.23412 5.88738 2.9133 6.20003 2.67991 6.56659C2.65832 6.59417 2.63839 6.62359 2.62037 6.6548C2.6041 6.68299 2.58986 6.7118 2.57762 6.74106C2.36607 7.13425 2.25 7.57904 2.25 8.03989V16.1198C2.25 17.0985 2.77353 18.0049 3.6234 18.4983L3.6251 18.4993L10.6233 22.5383L10.6243 22.5388C11.4767 23.0333 12.5233 23.0333 13.3757 22.5388L13.3765 22.5383L20.3748 18.4993L20.3765 18.4983C21.2263 18.0049 21.7499 17.0985 21.7499 16.1198V8.03989C21.7499 7.56024 21.6264 7.0978 21.4002 6.69346C21.3937 6.68046 21.3868 6.66757 21.3794 6.6548C21.3712 6.64056 21.3625 6.62669 21.3536 6.61319C21.1177 6.22315 20.7838 5.89201 20.372 5.65874ZM3.75 8.17298V16.1198C3.75 16.5607 3.98615 16.9741 4.37583 17.2007L11.2499 21.168V12.5028L3.75 8.17298ZM11.9999 11.2038L19.4882 6.88062L12.625 2.91957L12.6233 2.91859C12.2362 2.6938 11.7637 2.6938 11.3765 2.91859L11.3748 2.91957L4.51158 6.88063L11.9999 11.2038ZM20.2499 8.17291L12.7499 12.5029V21.168L19.6233 17.2011C20.0129 16.9745 20.2499 16.5607 20.2499 16.1198V8.17291Z"
                fill="#706CFF"
              />
            </svg>

            <h3 className="ml-3">Latest blocks</h3>
          </div>
          <a href="/blocks" className="button small">
            All
          </a>
        </div>
        <div>
          <table className="table">
            <tbody>
              <tr>
                <td className="text-large">
                  Block# <span className="text-accent-purple">787,89,21</span>
                </td>
                <td className="text-accent-purple text-small">3 Extrinsic</td>
                <td className="text-accent-purple text-small">16 events</td>
                <td className="text-dark-white text-small">
                  <div className="d-flex align-items-center">
                    <span className="mr-3">4 secs ago </span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 20C16.4 20 20 16.4 20 12C20 7.6 16.4 4 12 4C7.6 4 4 7.6 4 12C4 16.4 7.6 20 12 20ZM12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2ZM17 13.9L16.3 15.2L11 12.3V7H12.5V11.4L17 13.9Z"
                        fill="#979798"
                      />
                    </svg>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="text-large">
                  Block# <span className="text-accent-purple">787,89,21</span>
                </td>
                <td className="text-accent-purple text-small">3 Extrinsic</td>
                <td className="text-accent-purple text-small">16 events</td>
                <td className="text-dark-white text-small">
                  <div className="d-flex align-items-center">
                    <span className="mr-3">4 secs ago </span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 20C16.4 20 20 16.4 20 12C20 7.6 16.4 4 12 4C7.6 4 4 7.6 4 12C4 16.4 7.6 20 12 20ZM12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2ZM17 13.9L16.3 15.2L11 12.3V7H12.5V11.4L17 13.9Z"
                        fill="#979798"
                      />
                    </svg>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="text-large">
                  Block# <span className="text-accent-purple">787,89,21</span>
                </td>
                <td className="text-accent-purple text-small">3 Extrinsic</td>
                <td className="text-accent-purple text-small">16 events</td>
                <td className="text-dark-white text-small">
                  <div className="d-flex align-items-center">
                    <span className="mr-3">4 secs ago </span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 20C16.4 20 20 16.4 20 12C20 7.6 16.4 4 12 4C7.6 4 4 7.6 4 12C4 16.4 7.6 20 12 20ZM12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2ZM17 13.9L16.3 15.2L11 12.3V7H12.5V11.4L17 13.9Z"
                        fill="#979798"
                      />
                    </svg>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="text-large">
                  Block# <span className="text-accent-purple">787,89,21</span>
                </td>
                <td className="text-accent-purple text-small">3 Extrinsic</td>
                <td className="text-accent-purple text-small">16 events</td>
                <td className="text-dark-white text-small">
                  <div className="d-flex align-items-center">
                    <span className="mr-3">4 secs ago </span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 20C16.4 20 20 16.4 20 12C20 7.6 16.4 4 12 4C7.6 4 4 7.6 4 12C4 16.4 7.6 20 12 20ZM12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2ZM17 13.9L16.3 15.2L11 12.3V7H12.5V11.4L17 13.9Z"
                        fill="#979798"
                      />
                    </svg>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="text-large">
                  Block# <span className="text-accent-purple">787,89,21</span>
                </td>
                <td className="text-accent-purple text-small">3 Extrinsic</td>
                <td className="text-accent-purple text-small">16 events</td>
                <td className="text-dark-white text-small">
                  <div className="d-flex align-items-center">
                    <span className="mr-3">4 secs ago </span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 20C16.4 20 20 16.4 20 12C20 7.6 16.4 4 12 4C7.6 4 4 7.6 4 12C4 16.4 7.6 20 12 20ZM12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2ZM17 13.9L16.3 15.2L11 12.3V7H12.5V11.4L17 13.9Z"
                        fill="#979798"
                      />
                    </svg>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ clear: "both" }}></div>
    </div>
  );
}
