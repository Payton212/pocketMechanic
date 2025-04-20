interface ContractorPost {
    _id: string;
    description: string;
    image: string;
    contractorName: string;
}

interface ContractorPostListProps {
    contractorPosts: ContractorPost[];
    title: string;
}

const ContractorPostList: React.FC<ContractorPostListProps> = ({ contractorPosts, title }) => {
  if (!contractorPosts) {
     return <h3>No contractorPosts</h3>
   }
    return (
      <>
        <div className="cardBody">
        <h3>{title}</h3>
        {contractorPosts &&
          contractorPosts.map((contractorPost) => (
            <div key={contractorPost._id} className="ContractorPostCard">
              <h1>{contractorPost.contractorName}</h1>
              {contractorPost.image ? (
              <img
                src={contractorPost.image}
                />
              ) : null}
              <p>{ contractorPost.description }</p>
            </div>
          ))}
        </div>
      </>
    );
};
export default ContractorPostList