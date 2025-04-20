interface Employee {
    _id: string;
    image: string;
    firstName: string;
    lastName: string;
    description: string;
}
interface EmployeeListProps{
    employees: Employee[];
    title: string;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, title }) => {
    if (!employees.length) {
        return <h3>No Employees</h3>
    }
    return (
      <div className="cardBody">
        <h3>{title}</h3>
        {employees &&
          employees.map((employee) => (
            <div key={employee._id} className="employeeCard">
              <h1>
                {employee.firstName} {employee.lastName}
              </h1>
              {employee.image ? <img src={employee.image} /> : null}
              <p>{employee.description}</p>
            </div>
          ))}
      </div>
    );
};
export default EmployeeList;