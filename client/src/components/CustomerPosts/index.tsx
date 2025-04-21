import { DELETE_CUSTOMER_POST } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
interface CustomerPost {
  _id: string;
  image: string;
  description: string;
  firstName: string;
  lastName: string;
  budget: string;
  customerNumber: string;
}
interface CustomerPostListProps {
  customerPosts: CustomerPost[];
  title?: string;
  customerId?: string;
}

const CustomerPostList: React.FC<CustomerPostListProps> = ({ customerPosts, title, customerId, }) => {
  const [deleteCustomerPost] = useMutation(DELETE_CUSTOMER_POST);
  if (!customerPosts.length) {
    return <h3>No customerPosts</h3>;
  }
  const deletePost = async (_id: string, customerId: string) => {
    try {
      const { data } = await deleteCustomerPost({
        variables: {
          _id: _id,
          customerId: customerId
        },
      });
      console.log(`deleted: ${data}`)
    } catch (e) {
      console.error(e);
    }
  };
  if (customerId) {
    return (
      <div className="myPosts">
        {customerPosts &&
          customerPosts.map((customerPost) => (
            <div key={customerPost._id} className="CustomerPostCard cardBody">
              <h1 id="customerName">
                {customerPost.firstName} {customerPost.lastName}
              </h1>
              {customerPost.image ? <img src={customerPost.image} /> : null}
              <div className="budgetBox">
                <div className="customerBudget">
                  <h1 id="customerBudget">Budget:</h1>
                  <p id="customerBudget">$ {customerPost.budget}</p>
                </div>
                <div className="customerContact">
                  <h1 id="contractorContact">Contact: </h1>
                  <p id="contractorNumber">{customerPost.customerNumber}</p>
                </div>
              </div>
              <div className="customerDescriptionCard">
                <p>{customerPost.description}</p>
              </div>
              <button
                className="deleteButton"
                onClick={() => deletePost(customerPost._id, customerId)}
              >
                remove
              </button>
            </div>
          ))}
      </div>
    );
  } else {
    return (
      <div className="myPosts">
        {customerPosts &&
          customerPosts.map((customerPost) => (
            <div key={customerPost._id} className="CustomerPostCard cardBody">
              <h1 id="customerName">
                {customerPost.firstName} {customerPost.lastName}
              </h1>
              {customerPost.image ? <img src={customerPost.image} /> : null}
              <div className="budgetBox">
                <div className="customerBudget">
                  <h1 id="customerBudget">Budget:</h1>
                  <p id="customerBudget">$ {customerPost.budget}</p>
                </div>
                <div className="customerContact">
                  <h1 id="contractorContact">Contact: </h1>
                  <p id="contractorNumber">{customerPost.customerNumber}</p>
                </div>
              </div>
              <div className="customerDescriptionCard">
                <p>{customerPost.description}</p>
              </div>
            </div>
          ))}
      </div>
    );
  }
};
export default CustomerPostList;
