import { DELETE_CONTRACTOR_POST} from "../../utils/mutations";
import { useMutation } from "@apollo/client";
interface ContractorPost {
    _id: string;
    description: string;
    image: string;
  contractorName: string;
  contractorNumber: string;
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
                <h1 id="contractorName"
                >{contractorPost.contractorName}</h1>
                {contractorPost.image ? (
                  <img src={contractorPost.image} />
                ) : null}
                <div className="contactBox">
                  <h1 id="contractorContact"
                  >Contact: </h1> <p id="contractorNumber"
                  >{contractorPost.contractorNumber}</p>
                </div>
                <div className="contractorDescriptionCard">
                  <p>{contractorPost.description}</p>
                </div>
                
                <button
                  className="deleteButton"
                  onClick={() => deletePost(contractorPost._id, contractorId)}
                >
                  remove
                </button>
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
              >
                <h1 id="contractorName">{contractorPost.contractorName}</h1>
                {contractorPost.image ? (
                  <img src={contractorPost.image} />
                ) : null}
                <div className="contactBox">
                  <h1 id="contractorContact">Contact: </h1>{" "}
                  <p id="contractorNumber">{contractorPost.contractorNumber}</p>
                </div>
                <div className="contractorDescriptionCard">
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