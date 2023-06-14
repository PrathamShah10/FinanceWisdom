import React from "react";

const Profile = ({name = 'pratham'}: ProfileProps) => {
  return(
    <div>
        <div>
            <div className="pic">
                <img src="" alt="" />
            </div>
            <div className="info">
                <p>name: {name}</p>
            </div>
        </div>
    </div>
  )
};
type ProfileProps = {
    name?: string;
}
export default Profile;
