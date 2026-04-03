import NodeCG from "nodecg/types";

export default (nodecg: NodeCG.ServerAPI) => {
    nodecg.log.info("extension test");

    const exampleReplicant = nodecg.Replicant("example", {
        defaultValue: 0,
    });

    setInterval(() => {
        exampleReplicant.value++;
        nodecg.log.info(`exampleReplicant value: ${exampleReplicant.value}`);
    }, 1000)
};
