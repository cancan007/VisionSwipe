import axios from "axios"
import { pinataApiKey, pinataJwt, pinataSecretApiKey } from "../../../utils/admin/constants"
import { pinataPinFileUrl, pinataPinJsonUrl } from "../../../utils/url/admin.url"



export const uploadFileToIpfs = async(file:any) => {
    if(!pinataApiKey || !pinataSecretApiKey) return alert('Cannot upload file')
    let data = new FormData();
    data.append('file', file)
    const res = await axios.post(
        pinataPinFileUrl,
        data,
        {
        headers: { 
            'Authorization': `Bearer ${pinataJwt}`, 
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey
          },
        }
    );
    return res.data;
}

export const uploadJsonToIpfs = async(data:any) => {
    if(!pinataApiKey || !pinataSecretApiKey) return alert('Cannot upload file')
    const res = await axios.post(
        pinataPinJsonUrl,
        data,
        {
        headers: { 
            'Authorization': `Bearer ${pinataJwt}`,
            'Content-Type': 'application/json', 
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey
          },
        }
    );
    return res.data;
}