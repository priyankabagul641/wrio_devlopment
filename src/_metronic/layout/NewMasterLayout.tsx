import { Outlet } from "react-router-dom"


const MasterLayout = () => {
  return (
    <div className="container-fluid vh-100">
      <div className="container border border-danger">
        <Outlet />
      </div>
    </div>
  )
}

export { MasterLayout }
