interface CustomerPost {
    _id: string;
    image: string;
    description: string;
    firstName: string;
    lastName: string;
    budget: Number;
}
interface CustomerPostListProps {
    customerPosts: CustomerPost[];
    title: string;
}

const CustomerPostList: React.FC<CustomerPostListProps> = ({ customerPosts, title }) => {
    if (!customerPosts.length) {
        return <h3>No customerPosts</h3>;
    }
    return (
      <div className="cardBody">
        <h3>this is a {title} post</h3>
        {customerPosts &&
          customerPosts.map((customerPost) => (
            <div key={customerPost._id} className="CustomerPostCard">
              <h1>
                {customerPost.firstName} {customerPost.lastName}
              </h1>
              {customerPost.image ? <img src={customerPost.image} /> : null}
              <p>{customerPost.description}</p>
            </div>
          ))}
      </div>
    );
};
export default CustomerPostList;