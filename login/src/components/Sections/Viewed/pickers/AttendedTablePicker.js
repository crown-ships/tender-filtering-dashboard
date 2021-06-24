import A_AttendedTable from "../tables/attended/A_AttendedTable"
import SA_AttendedTable from "../tables/attended/SA_AttendedTable"
import S_AttendedTable from "../tables/attended/S_AttendedTable"

const AttendedTablePicker = (props) => {
  const user = props.auth.user;

  if (user.role === "admin"){
    console.log("admin");
    return(
      <A_AttendedTable {...props}/>
    );
  }
  if (user.role === "super-admin"){
    console.log("sa");
    return(
      <SA_AttendedTable {...props}/>
    );
  }
  if (user.role === "supervisor"){
    console.log("s");
    return(
      <S_AttendedTable {...props}/>
    );
  }
}
export default AttendedTablePicker;
