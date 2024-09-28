const CallInputs = (props) => {
    const updateValue = (type, val) => {
        switch (type) {
            case 'phone':
                props.setNumber(val);
                break;
            case 'flowId':
                props.setFlowId(val);
                break;
            case 'queue':
                props.setQueue(val);
                break;
        }
    };

  return (
    <div>
        <div>
            <label htmlFor="phoneNo" className="block mb-2 text-sm font-medium text-gray-900 light:text-black">Phone Number</label>
            <input id="phoneNo" value={props.phoneNo} onChange={e => updateValue('phone', e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
        </div>
        <div>
            <label htmlFor="flowId" className="block mb-2 text-sm font-medium text-gray-900 light:text-black">ContactFlowId</label>
            <input id="flowId" value={props.flowId} onChange={e => updateValue('flowId', e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
        </div>
        <div>
            <label htmlFor="queueArn" className="block mb-2 text-sm font-medium text-gray-900 light:text-black">Queue ARN</label>
            <input id="queueArn" value={props.queueArn} onChange={e => updateValue('queue', e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
        </div>
    </div>
  );
};

export default CallInputs;
