/** @jsxImportSource @emotion/react */

import type { NextPage } from "next";
import { useEffect, useState } from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import UserHome from "../components/UserHome";

const About: NextPage = () => {
  const [showKycFlow, setShowKycFlow] = useState<boolean>(false);
  const [openSideDrawer, setOpenSideDrawer] = useState<boolean>(false);

  useEffect(() => {
    //call user api to check if logged in
    //call api for stored document when user is successful
  });
  return (
    <div>
      <div
        style={{
          height: "100vh",
          background: "#F5F5F5",
          overflow: "auto",
        }}
      >
        <div css={{ display: "flex" }}>
          <div
            css={{
              width: openSideDrawer ? "90%" : "95%",
              justifyContent: "end",
              transition: "0.2s all ease-in",
              margin: "auto auto",
            }}
          >
            <Header />
            <div
              className='description'
              style={{
                background: "#F5F5F5",
                color: "black",
                textAlign: "justify",
                textJustify: "inter-word",
                margin: "1rem 10rem",
                lineHeight: "1.5rem",
              }}
            >
              <section>
                <p>
                  Blockchain is a distributed ledger technology that enables
                  secure, transparent and tamper-proof record-keeping of
                  transactions. One of the most promising applications of
                  blockchain technology is in the field of document storage,
                  where it can ensure the integrity, authenticity, and privacy
                  of important documents.
                </p>
                <p>
                  A verified document storage project using blockchain
                  technology is a secure and tamper-proof way to store sensitive
                  information. Blockchain technology ensures that documents are
                  encrypted and cannot be altered or deleted. This project aims
                  to provide a secure and efficient way for individuals and
                  organizations to store and access important documents.
                </p>
              </section>
              <section>
                <h4>Benefits of using blockchain:</h4>
                <p
                  style={{
                    lineHeight: "1.5rem",
                  }}
                >
                  <ul>
                    <li>
                      Immutability: Blockchain technology ensures that once data
                      is recorded, it cannot be changed or deleted. This makes
                      it ideal for storing important documents that require a
                      high level of security.
                    </li>
                    <li>
                      Decentralization: Blockchain technology removes the need
                      for a centralized authority to manage data. This means
                      that the data is not controlled by a single entity, making
                      it less vulnerable to attack.
                    </li>
                    <li>
                      Transparency: Blockchain technology allows for transparent
                      and auditable transactions. All transactions are recorded
                      on the blockchain and can be viewed by anyone.
                    </li>
                    <li>
                      Efficiency: Blockchain technology allows for fast and
                      efficient transactions, which is ideal for document
                      storage.
                    </li>
                  </ul>
                </p>
              </section>
              <section>
                <h4>DocuSmriti and its features:</h4>
                <p>
                  DocuSmriti aims to create a secure and tamper-proof platform
                  for storing important documents such as legal contracts,
                  certificates, diplomas, and other sensitive information. The
                  platform is built using blockchain technology to ensure the
                  authenticity and integrity of the stored documents. The
                  platform is accessible through a web-based interface and has
                  multiple layers of security to ensure that only KYC-verified
                  users can access the documents. The platform is designed to be
                  user-friendly and intuitive so that users can easily upload,
                  store, retrieve, and verify their documents.
                </p>
                <p>
                  The platform is accessible through a web-based interface and
                  has multiple layers of security to ensure that only
                  KYC-verified users can access the documents. The platform is
                  designed to be user-friendly and intuitive so that users can
                  easily upload, store, retrieve, and verify their documents.
                </p>
              </section>
              <section>
                <h4>Business model:</h4>
                <p>
                  The verified document storage project will have a
                  subscription-based business model, where users will pay a
                  monthly or annual fee to access the platform. The subscription
                  fee will be based on the amount of storage required and the
                  number of documents stored.
                </p>
                <p>
                  The project will also generate revenue from the verification
                  service, where third parties will pay a fee to verify the
                  authenticity and integrity of the stored documents.
                </p>
              </section>
              <section>
                <h4>How it works : </h4>
                <p>
                  <ol>
                    <li>The user connects his/her Metamask wallet.</li>
                    <li>
                      User has to add his/her KYC details in the profiles page.
                      A user cannot access the Documents Page if they have not
                      added their KYC information.Neither the user can upload
                      any document.
                    </li>
                    <li>
                      On the Docs Page, the user can view his/her existing
                      contracts.
                      <p>
                        These existing contracts are classified into three
                        categories which are :
                        <ul>
                          <li>
                            All Signed : The contract has been signed by all the
                            parties involved.
                          </li>
                          <li>
                            Signed : The contract has been signed by the user,
                            but is yet to be signed by one or more other
                            parties.
                          </li>
                          <li>
                            Pending: The contract is yet to be signed by the
                            user.
                          </li>
                        </ul>
                        <p>
                          Every contract displayed in any of the sections will
                          have the option of viewing the status(Signed or
                          Pending),emails and address of the parties involved.
                          The user will have the choice to sign any contracts
                          that are listed in the pending section.
                        </p>
                      </p>
                    </li>
                    <li>
                      The user has the option to upload a new contract on the
                      Docs Page. When uploading a new contract the user has to
                      add information about the contract such as StartDate,
                      EndDate, Emails and Addresses of all the parties involved
                      etc.
                    </li>
                    <li>
                      User has the option to verify a document on the docs page,
                      the user can upload a document and can view the details
                      about the contract in which that particular document was
                      added.
                    </li>
                  </ol>
                </p>
              </section>
              <section>
                <h4>Conclusion:</h4>
                <p>
                  The verified document storage project is a promising
                  application of blockchain technology that can provide secure
                  and tamper-proof storage of important documents. The projects
                  business model and marketing strategy are well-suited to the
                  target market, and strong cryptographic techniques ensure the
                  integrity, authenticity, and privacy of the stored documents.
                  With the increasing need for secure document storage, the
                  verified document storage project has a bright future.
                </p>
              </section>
              <section>
                <h4>Phase 1 (Completed) :</h4>
                <p
                  style={{
                    lineHeight: "1.5rem",
                  }}
                >
                  <ol>
                    <li>Basic KYC enabled with Aadhar and selfie</li>
                    <li>IPFS upload</li>
                    <li>Multiparty signature</li>
                    <li>Verifying document</li>
                  </ol>
                </p>
              </section>
              <section>
                <h4>Phase 2 :</h4>
                <p
                  style={{
                    lineHeight: "1.5rem",
                  }}
                >
                  <ol>
                    <li>KYC updates as per govt. regulations</li>
                    <li>Social login</li>
                    <li>Bulk upload</li>
                    <li>On-ramp and off-ramp payment support </li>
                    <li>Customized institutional support</li>
                  </ol>
                </p>
              </section>
              <section>
                <h4>Phase 3 (WIP/Help needed):</h4>
                <p
                  style={{
                    lineHeight: "1.5rem",
                  }}
                >
                  <ol>
                    <li>White </li>
                    <li>Product testing</li>
                    <li>Domain purchase</li>
                    <li>Payment gateway integration</li>
                    <li>Marketing and branding</li>
                  </ol>
                </p>
              </section>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default About;
