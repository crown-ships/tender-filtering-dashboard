import A_ViewedTable from "../tables/viewed/A_ViewedTable"
// import SA_ViewedTable from "../tables/viewed/SA_ViewedTable"
import S_ViewedTable from "../tables/viewed/S_ViewedTable"

const ViewedTablePicker = (props) => {
  const user = props.auth.user;

  if (user.role === "admin"){
    console.log("admin");
    return(
      <A_ViewedTable {...props}/>
    );
  }
  // if (user.role === "super-admin"){
  //   console.log("sa");
  //   return(
  //     <SA_ViewedTable {...props}/>
  //   );
  // }
  if (user.role === "supervisor"){
    console.log("s");
    return(
      <S_ViewedTable {...props}/>
    );
  }
}
export default ViewedTablePicker;
