import A_TenderTable from "./tables/A_TenderTable"
import SA_TenderTable from "./tables/SA_TenderTable"
import S_TenderTable from "./tables/S_TenderTable"

const TenderTablePicker = (props) => {
  const user = props.auth.user;

  if (user.role === "admin"){
    console.log("admin");
    return(
      <A_TenderTable {...props}/>
    );
  }
  if (user.role === "super-admin"){
    console.log("sa");
    return(
      <SA_TenderTable {...props}/>
    );
  }
  if (user.role === "supervisor"){
    console.log("s");
    return(
      <S_TenderTable {...props}/>
    );
  }
}
export default TenderTablePicker;
