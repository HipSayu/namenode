import axios from 'axios';
import ManagerDataNode from '../models/ManagerDataNode'


const Requireheartbeat1 = () => {
    const heartbeatEndPoint = 'http://localhost:3001/namenode/hearbeat'
    setInterval(async () => {
       await axios.post(heartbeatEndPoint, {
            check: 'heartBeat'
        })
        .then(async (res)=>{
            // có heartBeat thì lưu vào còn sống
            var heartBeat = res.data
            console.log('dataheartBeataNode1', heartBeat)
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
    }, 3000);
};

const Requireheartbeat2 = () => {
    const heartbeatEndPoint = 'http://localhost:3002/namenode/hearbeat'
    setInterval(async () => {
       await axios.post(heartbeatEndPoint, {
            check: 'heartBeat'
        })
        .then(async (res)=>{
            // có heartBeat thì lưu vào còn sống
            var heartBeat = res.data
            console.log('dataheartBeataNode2', heartBeat)
            await ManagerDataNode.find({NameNodeID :"HipdzVao"}).then(async (data, err) => {
                data = data[0];
                let dataNode2 = data.dataNode2
                console.log('dataNode2', dataNode2)
                console.log('Alive', dataNode2.Alive)
                let Alive = dataNode2.Alive
                if (Alive != 'Yes') {
                    dataNode2.Alive='Yes'
                    await ManagerDataNode.updateOne(
                        {
                            "NameNodeID": 'HipdzVao'
                        },
                        {
                            $set : {dataNode2 : dataNode2}
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
                    let dataNode2 = data.dataNode2
                    console.log('dataNode2', dataNode2)
                    console.log('Alive', dataNode2.Alive)
                    let Alive = dataNode2.Alive
                    if (Alive != 'No') {
                        dataNode2.Alive='No'
                        await ManagerDataNode.updateOne(
                            {
                                "NameNodeID": 'HipdzVao'
                            },
                            {
                                $set : {dataNode2 : dataNode2}
                            }
                        )
                    }
                })
        })
        console.log('Sent HeartBeat');
    }, 3000);
};

const Requireheartbeat3 = () => {
    const heartbeatEndPoint = 'http://localhost:3003/namenode/hearbeat'
    setInterval(async () => {
       await axios.post(heartbeatEndPoint, {
            check: 'heartBeat'
        })
        .then(async (res)=>{
            // có heartBeat thì lưu vào còn sống
            var heartBeat = res.data
            console.log('dataheartBeataNode3', heartBeat)
            await ManagerDataNode.find({NameNodeID :"HipdzVao"}).then(async (data, err) => {
                data = data[0];
                let dataNode3 = data.dataNode3
                console.log('dataNode3', dataNode3)
                console.log('Alive', dataNode3.Alive)
                let Alive = dataNode3.Alive
                if (Alive != 'Yes') {
                    dataNode3.Alive='Yes'
                    await ManagerDataNode.updateOne(
                        {
                            "NameNodeID": 'HipdzVao'
                        },
                        {
                            $set : {dataNode3 : dataNode3}
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
                    let dataNode3 = data.dataNode3
                    console.log('dataNode3', dataNode3)
                    console.log('Alive', dataNode3.Alive)
                    let Alive = dataNode3.Alive
                    if (Alive != 'No') {
                        dataNode3.Alive='No'
                        await ManagerDataNode.updateOne(
                            {
                                "NameNodeID": 'HipdzVao'
                            },
                            {
                                $set : {dataNode3 : dataNode3}
                            }
                        )
                    }
                })
        })
        console.log('Sent HeartBeat');
    }, 3000);
};


module.exports = {
    Requireheartbeat1,
    Requireheartbeat2,
    Requireheartbeat3
};
