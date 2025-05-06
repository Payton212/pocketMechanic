import { DELETE_EMPLOYEE } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
interface Employee {
    _id: string;
    profileImg: string;
    firstName: string;
    lastName: string;
    description: string;
}
interface EmployeeListProps {
  employees: Employee[];
  contractorId?: string;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, contractorId }) => {
    const [removeEmployee] = useMutation(DELETE_EMPLOYEE);
    if (!employees.length) {
        return <h3>No Employees</h3>
    }
  const deleteEmployee = async (_id: string, contractorId: string) => {
    try {
      const { data } = await removeEmployee({
        variables: {
          _id: _id,
          contractorId: contractorId
        },
      });
      console.log(`deleted: ${data}`);
    } catch (e) {
      console.error(e);
    }
  };
    if (contractorId) {
         return (
           <div className="employeeLists">
             {employees &&
               employees.map((employee) => (
                 <div key={employee._id} className="employeeCard cardBody">
                   <h1>
                     {employee.firstName} {employee.lastName}
                   </h1>
                   <div className="employeeProfilePicBox">
                     {employee.profileImg ? (
                       <img
                         src={employee.profileImg}
                         className="employeeProfilePic"
                       />
                     ) : null}
                   </div>
                   <div className="employeeDescriptionBox">
                     <p>{employee.description}</p>
                   </div>

                   <button
                     className="deleteButton"
                     onClick={() => deleteEmployee(employee._id, contractorId)}
                   >
                     remove
                   </button>
                 </div>
               ))}
           </div>
         );
    } else {
        return (
            <div>
          {employees &&
            employees.map((employee) => (
              <div key={employee._id} className="employeeCard cardBody">
                <h1>
                  {employee.firstName} {employee.lastName}
                </h1>
                <div className="employeeProfilePicBox">
                  {employee.profileImg ? <img
                    src={employee.profileImg}
                    className="employeeProfilePic"
                  /> : null}
                </div>
                
                <p>{employee.description}</p>
              </div>
            ))}
        </div>
        );
    }
};
export default EmployeeList;