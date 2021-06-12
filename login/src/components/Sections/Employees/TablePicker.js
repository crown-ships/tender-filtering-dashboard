import A_Table from "./Tables/A_Table"
import SA_Table from "./Tables/SA_Table"
import S_Table from "./Tables/S_Table"

const TablePicker = (props) => {
  const user = props.auth.user;

  if (user.role === "admin"){
    console.log("admin");
    return(
      <A_Table {...props}/>
    );
  }
  if (user.role === "super-admin"){
    console.log("sa");
    return(
      <SA_Table {...props}/>
    );
  }
  if (user.role === "supervisor"){
    console.log("s");
    return(
      <S_Table {...props}/>
    );
  }
}
export default TablePicker;
