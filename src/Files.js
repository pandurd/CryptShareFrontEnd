import React, { useState, useEffect } from "react";

const Files = (email) => {

    const [ownedFiles, SetOwnedFiles] = useState([]);
    const [sharedFiles, SetSharedFiles] = useState([]);
    const apiURL = `http://20.81.110.66/api/`;

    useEffect(async () =>{
        let ownedFiles = await fetch(apiURL + 'Files/email/' + email);
        SetOwnedFiles(ownedFiles);
        let sharedFiles =  await fetch(apiURL + 'Files/shared/' + email);
        SetSharedFiles(sharedFiles);
    }, []);

    return (
        <div>                   
            <div>
                List of Files Owned
            </div>
            <div>
                {ownedFiles.length > 0 && ownedFiles.forEach((file) => <div>{file.FileName}</div>)}
            </div>

            <div>
                List of Files Shared with you
            </div>
            <div>
                {sharedFiles.length >0 && sharedFiles.forEach((file) => <div>{file.FileName}</div>)}
            </div>
        </div>
    );
};

export default Files;