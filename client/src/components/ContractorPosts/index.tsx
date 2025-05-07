import { DELETE_CONTRACTOR_POST} from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
interface ContractorPost {
  _id: string;
  description: string;
  img: string;
  businessName: string;
  userNumber: string;
  username: string;
}

interface ContractorPostListProps {
  contractorPosts: ContractorPost[];
  title?: string;
  contractorId?: string;
}

const ContractorPostList: React.FC<ContractorPostListProps> = ({ contractorPosts, title, contractorId }) => {
      const [deleteContractorPost] = useMutation(DELETE_CONTRACTOR_POST);
  if (!contractorPosts) {
     return <h3>No contractorPosts</h3>
  }
  const deletePost = async (_id: string, contractorId: string) => {
    try {
      const { data } = await deleteContractorPost({
        variables: {
          _id: _id,
          contractorId: contractorId
        },
      });
      console.log(`deleted: ${data}`);
    } catch (e) {
      console.error(e);
    }
  }
  if (contractorId) {
    return (
      <>
        <div className="myPosts">
          {contractorPosts &&
            contractorPosts.map((contractorPost) => (
              <div
                key={contractorPost._id}
                className="ContractorPostCard cardBody"
              >
                <div className="imgBox">
                  <h1
                    id="contractorName"
                  >
                    {" "}
                    {contractorPost.businessName}
                  </h1>

                  {contractorPost.img ? (
                    <img id="contractorImg" src={contractorPost.img} />
                  ) : null}
                </div>
                <div className="contractorPostBox">
                  <div className="contactBox">
                    <h1 id="contractorContact">Contact: </h1>{" "}
                    <p id="contractorNumber">{contractorPost.userNumber}</p>
                  </div>

                  <p>{contractorPost.description}</p>
                </div>
                <div className="deleteButton">
                  <button
                    id="deleteButton"
                    onClick={() => deletePost(contractorPost._id, contractorId)}
                  >
                    remove
                  </button>
                </div>
              </div>
            ))}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="myPosts">
          {contractorPosts &&
            contractorPosts.map((contractorPost) => (
              <div
                key={contractorPost._id}
                className="ContractorPostCard cardBody"
              ><div className="imgBox">
                <Link
                  id="contractorName"
                  to={`contractorProfile/${contractorPost.username}`}
                > {contractorPost.businessName}
                </Link>
                 
                  {contractorPost.img ? (
                    <img id="contractorImg" src={contractorPost.img} />
                  ) : null}
                </div>
                <div className="contractorPostBox">
                  <div className="contactBox">
                    <h1 id="contractorContact">Contact: </h1>{" "}
                    <p id="contractorNumber">{contractorPost.userNumber}</p>
                  </div>
                  
                  <p>{contractorPost.description}</p>
                  
                </div>
              </div>
            ))}
        </div>
      </>
    );
      
  }
    
};
export default ContractorPostList