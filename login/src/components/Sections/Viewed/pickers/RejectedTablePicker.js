import A_RejectedTable from "../tables/rejected/A_RejectedTable"
import SA_RejectedTable from "../tables/rejected/SA_RejectedTable"
import S_RejectedTable from "../tables/rejected/S_RejectedTable"

  const RejectedTablePicker = (props) => {
  const user = props.auth.user;

  if (user.role === "admin"){
    console.log("admin");
    return(
      <A_RejectedTable {...props}/>
    );
  }
  if (user.role === "super-admin"){
    console.log("sa");
    return(
      <SA_RejectedTable {...props}/>
    );
  }
  if (user.role === "supervisor"){
    console.log("s");
    return(
      <S_RejectedTable {...props}/>
    );
  }
}
export default RejectedTablePicker;
