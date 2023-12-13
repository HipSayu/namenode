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
    const Replication = 2;
    const mb150 = 150000000
    const mb200 = 200000000
    const Clients = req.body;
    // const directory =path.join(__dirname,'NamenodeTest' )
    // fs.writeFileSync(directory+"/test.png",Clients.file);
    const Request = Clients.Request;
    console.log('Clients', Clients)
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

        await ManagerDataNode.find({}).then(async (data, err) => {
            let DataNodeAlive = [];
            let DatanodeWrite = []
            let DatanodeReplication1 = []
            let DatanodeReplication2 = []
            let metaDatas = []
            

            data = data[0];
            // console.log('check NameNode',data)
            for (let i=1; i<5;i++ ){
                if (data[`dataNode${i}`].Alive == 'Yes'){
                    DataNodeAlive.push(data[`dataNode${i}`])
                }
            }
        //    console.log('DataNode', DataNodeAlive)
           //random

            for (let i=0; i<NumberChunk;i++ ){
                var randomIndex = Math.floor(Math.random() * DataNodeAlive.length);
                var randomIndex1 = Math.floor(Math.random() * DataNodeAlive.length);
                var randomIndex2 = Math.floor(Math.random() * DataNodeAlive.length);
                DatanodeWrite.push(DataNodeAlive[randomIndex])
                DatanodeReplication1.push(DataNodeAlive[randomIndex1])
                DatanodeReplication2.push(DataNodeAlive[randomIndex2])
            }
            // console.log('DatanodeWrite', DatanodeWrite)
            // console.log('DatanodeReplication1', DatanodeReplication1)
            // console.log('DatanodeReplication2', DatanodeReplication2)
            

            for (let i = 1; i <= NumberChunk; i += 1) {
                metaDatas.push({
                    nameFile: Clients.name,
                    desc: Clients.description,
                    indexFile: i,
                    DataNode:DatanodeWrite[i-1].address,
                    DatanodeReplication1:DatanodeReplication1[i-1].address,
                    DatanodeReplication2:DatanodeReplication1[i-1].address,
                });
            }
            console.log('check Meta', metaDatas);
            await metaData
                        .insertMany(metaDatas)
                        .then(console.log('Write Succesfully'));

            res.send({
                    metaDatas: metaDatas,
                    NumberChunk: NumberChunk,
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
                let metaDatas = [];
                await ManagerDataNode.find({}).then(async (ManagerDataNode, err) => {
                    let DataNodeAlive = [];
                    ManagerDataNode = ManagerDataNode[0];
                    // console.log('check NameNode',data)
                    for (let i=1; i<5;i++ ){
                        if (ManagerDataNode[`dataNode${i}`].Alive == 'Yes'){
                            DataNodeAlive.push(ManagerDataNode[`dataNode${i}`].address)
                        }
                    }
                    console.log('DataNodeAlive', DataNodeAlive)
                    data.forEach((element, index) => {
                        if (DataNodeAlive.includes(element.DataNode)){
                            metaDatas.push({
                              nameFile: element.nameFile,
                              desc: element.desc,
                              indexFile: element.indexFile,
                              DataNode : element.DataNode
                            })
                            return
                        }
                        else if (DataNodeAlive.includes(element. DatanodeReplication1)){
                            metaDatas.push({
                              nameFile: element.nameFile,
                              desc: element.desc,
                              indexFile: element.indexFile,
                              DataNode : element. DatanodeReplication1
                            })
                            return
                        }
                        else if (DataNodeAlive.includes(element. DatanodeReplication2)){
                            metaDatas.push({
                              nameFile: element.nameFile,
                              desc: element.desc,
                              indexFile: element.indexFile,
                              DataNode : element. DatanodeReplication2
                            })
                            return
                        }
                    });
                    console.log('data', metaDatas)
                    
                })
                res.send({
                    metadata:metaDatas,
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
