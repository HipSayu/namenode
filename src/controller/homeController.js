import nameNode from '../models/nameNode';
import axios from 'axios';
import fs from 'fs'
import path from 'path';
import metaData from '../models/metadata';
import ManagerDataNode from '../models/ManagerDataNode'

const handleHelloWord = (req, res) => {
    return res.render('home.ejs');
};




const Requireheartbeat = () => {
    const heartbeatEndPoint = 'http://localhost:3001/namenode/hearbeat'
    setInterval(async () => {
       await axios.post(heartbeatEndPoint, {
            check: 'heartBeat'
        })
        .then(async (res)=>{
            // có heartBeat thì lưu vào còn sống
            var heartBeat = res.data
            console.log('datheartBeataNode1', heartBeat)
            await ManagerDataNode.find({NameNodeID :"HipdzVao"}).then(async (data, err) => {
                data = data[0];
                let dataNode1 = data.dataNode1
                console.log('dataNode1', dataNode1)
                console.log('Alive', dataNode1.Alive)
                let Alive = dataNode1.Alive
                if (Alive != 'Yes') {
                    dataNode1.Alive='Yes'
                    await ManagerDataNode.updateOne(
                        {
                            "NameNodeID": 'HipdzVao'
                        },
                        {
                            $set : {dataNode1 : dataNode1}
                        }
                    )
                }
                
            })
        })
        .catch(async (err)=>{
                 // có heartBeat thì lưu vào dead
                console.log( 'check error')
                await ManagerDataNode.find({NameNodeID :"HipdzVao"}).then(async (data, err) => {
                    data = data[0];
                    let dataNode1 = data.dataNode1
                    console.log('dataNode1', dataNode1)
                    console.log('Alive', dataNode1.Alive)
                    let Alive = dataNode1.Alive
                    if (Alive != 'No') {
                        dataNode1.Alive='No'
                        await ManagerDataNode.updateOne(
                            {
                                "NameNodeID": 'HipdzVao'
                            },
                            {
                                $set : {dataNode1 : dataNode1}
                            }
                        )
                    }
                })
        })
        console.log('Sent HeartBeat');
    }, 4000);
};



const hanldeCheckRequest = async (req, res) => {
    const mb150 = 150000000
    const mb200 = 200000000
    const Clients = req.body;
    // const directory =path.join(__dirname,'NamenodeTest' )
    // fs.writeFileSync(directory+"/test.png",Clients.file);
    const Request = Clients.Request;
    console.log(Clients)
    if (Request == 'Write') {
        var NumberChunk
        var sizeFile = Clients.sizeFile
        if (sizeFile <mb150){
            NumberChunk = 3
        }
        else if (sizeFile>mb150 && sizeFile<=mb200){
            NumberChunk = 4
        }
        else {
            NumberChunk = 5
        }

        await nameNode.find({NameNodeID :"HipdzVao"}).then(async (data, err) => {
            console.log('check NameNode',data)
            var metaDatas = [];
            data = data[0];
            data = data.DataNode;
            
            for (let i = 0; i < 3; i += 1) {
                metaDatas.push({
                    nameFile: Clients.name,
                    desc: Clients.description,
                    indexFile: i,
                    DataNode: data[`DataNode${i + 1}`],
                });
            }
            console.log('check Meta', metaDatas);
            await metaData
                        .insertMany(metaDatas)
                        .then(console.log('Write Succesfully'));

            res.send({
                    AddressDataNode: metaDatas,
                    NumberChunk: NumberChunk,
                    request : 'write'
            })
            
        });
    }
    // if (Request == 'Write') {
    //     var file = Clients.file
    //     await nameNode.find({}).then(async (data, err) => {
    //         var metaDatas = [];
    //         data = data[0];
    //         var dataNodeSize= data.DataNodeSize;
    //         var dataNode = data.DataNode;
    //         // lấy random các dataNode còn trống

    //         const keys = Object.keys(dataNode);
    //         console.log(keys)
           
    //         var shuffledArray = keys.slice(); 
    //         var DataNodeInser = [];
        
    //         for (var i = 0; i < NumberChunk; i++) {
    //             var randomIndex = Math.floor(Math.random() * (shuffledArray.length - i));
    //             var selectedElement = shuffledArray[randomIndex];
    //             DataNodeInser.push(selectedElement);
    //             shuffledArray[randomIndex] = shuffledArray[shuffledArray.length - 1 - i];
    //         }
    //         console.log(DataNodeInser)


    //         for (let i = 0; i < NumberChunk; i += 1) {
    //             metaDatas.push({
    //                 nameFile: Clients.name,
    //                 desc: Clients.description,
    //                 indexFile: i,
    //                 DataNode: dataNode[`${DataNodeInser[i]}`],
    //             });
    //         }
    //         console.log('check Meta', metaDatas);
    //         await metaData
    //                     .insertMany(metaDatas)
    //                     .then(console.log('Write Succesfully'));

    //         res.send({
    //                 AddressDataNode: metaDatas,
    //                 file: file,
    //                 request : 'write'
    //         })
            
    //     });
    // }
    else {
        const name = Clients.name
        await metaData.find({nameFile : name})
        .then(async (data, err) =>{
           if (data.length == 0){
                res.send('Not in DB')
           }
           else{
                res.send({
                    metadata:data,
                    request : 'read'
                })
           }
           console.log('send to Client Complete')
        })
    }
};


module.exports = {
    handleHelloWord,
    hanldeCheckRequest,
    Requireheartbeat
};
