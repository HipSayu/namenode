import fs from 'fs'
import path from 'path';
import metaData from '../models/metadata';
import ManagerDataNode from '../models/ManagerDataNode'

const handleHelloWord = (req, res) => {
    return res.render('home.ejs');
};





function getRandomUniqueElement(arr) {
    var randomIndex = Math.floor(Math.random() * arr.length);
    var randomElement = arr[randomIndex];
    arr.splice(randomIndex, 1);
    return randomElement;
}

const hanldeCheckRequest = async (req, res) => {
    const Replication = 2;
    const mb150 = 150000000
    const mb200 = 200000000
    const Clients = req.body;
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
            if(DataNodeAlive.length >=3){
                for (let i=0; i< NumberChunk;i++ ){
                    let DataNodeAlive_Copy = DataNodeAlive.slice()
                    DatanodeWrite.push(getRandomUniqueElement(DataNodeAlive_Copy));
                    DatanodeReplication1.push(getRandomUniqueElement(DataNodeAlive_Copy));
                    DatanodeReplication2.push(getRandomUniqueElement(DataNodeAlive_Copy));
                }
            }else if (DataNodeAlive.length == 2){
                for (let i=0; i< NumberChunk;i++ ){
                    var random = Math.floor(Math.random() * DataNodeAlive.length)
                    DatanodeWrite.push(DataNodeAlive[0]);
                    DatanodeReplication1.push(DataNodeAlive[1]);
                    DatanodeReplication2.push(DataNodeAlive[random]);
                }
            }else{
                for (let i=0; i< NumberChunk;i++ ){
                    DatanodeWrite.push((DataNodeAlive[0]));
                    DatanodeReplication1.push(DataNodeAlive[0]);
                    DatanodeReplication2.push(DataNodeAlive[0]);
                }
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
                    DatanodeReplication2:DatanodeReplication2[i-1].address,
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
};
