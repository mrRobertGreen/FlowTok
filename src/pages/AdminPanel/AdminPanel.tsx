import React, {useEffect} from "react";

import DataTable, {createTheme} from 'react-data-table-component';
import {compose} from "redux";
import {withAdminRedirect, withAuthRedirect, withProfileRedirect} from "../../hocs/hocs";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {getStatsData} from "../../redux/user-reducer";
import Preloader from "../../components/common/Preloader/Preloader";

createTheme('light', {
   text: {
      primary: 'black',
      secondary: '#C5CAC9',
   },
   background: {
      default: '#fff',
   },
   divider: {
      default: '#e6f9f5',
   },
});

const customStyles = {
   tableWrapper: {
      style: {
         width: "100%",
         height: "100%",
         fontFamily: "'Montserrat', sans-serif",
      }
   },
   header: {
      style: {
         paddingLeft: '8px',
         paddingRight: '8px',
      },
   },
   headCells: {
      style: {
         paddingLeft: '8px',
         paddingRight: '8px',
      },
   },
   cells: {
      style: {
         paddingLeft: '8px',
         paddingRight: '8px',
      },
   },
};

const columns = [
   {
      name: 'Название',
      selector: 'name',
      grow: 1,
      width: "75%",
   },
   {
      name: 'Значение',
      selector: 'value',
      right: true,
      width: "25%",
   },
];

function AdminPanel() {
   const data = useSelector((state: RootStateType) => state.user.stats)
   const isFetching = useSelector((state: RootStateType) => state.app.isFetching)
   const dispatch = useDispatch()

   useEffect(() => {
      if (!data) {
         dispatch(getStatsData())
      }
   },[data, dispatch])

   if (isFetching) return <Preloader/>

   return (
      <div style={{height: "100%", width: "100%"}}>
         <DataTable
            theme={"light"}
            title="Статистика"
            columns={columns}
            data={data ? data : []}
            customStyles={customStyles}
         />
      </div>

   )
}

export default compose(
   withAuthRedirect,
   withAdminRedirect,
)(AdminPanel)