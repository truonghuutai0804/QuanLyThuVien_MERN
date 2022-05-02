import React from 'react'
import { Outlet } from 'react-router-dom'
import SiderAdmin from '../../../compoments/Common/Admin/SidebarAdmin'
import HeaderAdmin from '../../../compoments/Common/Admin/HeaderAdmin'

const Admin = () => {
    return (
        <>
            <HeaderAdmin/>
            <div className='row'>
                <div className='col-lg-2 bg-dark variant-dark'>
                    <SiderAdmin/>
                </div>
                <div className='col-lg-10 mt-4'>
                    <Outlet />
                </div>
            </div>

        </>
    )
}

export default Admin
