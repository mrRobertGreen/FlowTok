import React, {FC} from 'react';
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {Page} from "../../components/Page/Page";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import Nav from "../../components/ContainersPage/Nav/Nav";
import {ContainerT} from "../../redux/user/user-reducer";
import {ContainersList} from "../../components/ContainersPage/ConatinersList/ContainersList";
import {useParams} from "react-router";

type PropsType = {}

export const Containers: FC<PropsType> = () => {
   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)
   const {type} = useParams()

   return (
      <Page bg={"#E5E5EA"} isNavbar={true} pageName={"Work"}>
         {!isDesktop && <TopNavbar label={"Контейнер"} logo={true}/>}
         <Nav type={type as ContainerT}/>
         <ContainersList/>
      </Page>
   )
}
