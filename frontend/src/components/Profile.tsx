import React from "react";

const Profile = ({name = 'pratham'}: ProfileProps) => {
  return(
    <div>
        <div>
            <div className="pic">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-1ls-t9kJh2d1Ma4v39c1SbC00tq6N6Jukx6i4fCqSm2J2ZTY2x0ktpfpU5ttMQlkdTQ&usqp=CAU" alt="" />
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
