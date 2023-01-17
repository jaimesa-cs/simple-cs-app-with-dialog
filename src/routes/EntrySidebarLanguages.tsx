import Icon from '../images/sidebarwidget.svg';
import { useEffect, useRef, useState } from "react";
import ContentstackAppSDK from "@contentstack/app-sdk";
import "@contentstack/venus-components/build/main.css";
import { InfiniteScrollTable } from '@contentstack/venus-components';
import { table } from 'console';
var axios = require('axios');

function EntrySidebarExtension() {

  const [tableData, setTableData] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [entry, setEntry] = useState<any>(null);
  const [itemStatusMap, setItemStatusMap] = useState<any>([]);

  useEffect(() => {
    ContentstackAppSDK.init().then(async (sdk) => {
      var sidebarWidget = sdk.location.SidebarWidget;
      var fieldData = await sidebarWidget?.entry.getData();
      setEntry(fieldData);
      fetchData(fieldData);
    })
  }, [])

  async function fetchData(entry: any) {
    let data = await createTableData(entry.publish_details);
    setTableData(data);
    setLoading(false);
    setCount(data.length);
  }


  async function createTableData(publish_details: any[]) {
    var tableData: any[] = [];
    if (publish_details) {
      tableData = publish_details.map(async (data: any, index: number) => {
        itemStatusMap[index] = 'loaded';
        let name = await getEnvironmentName(data);
        return {
          index: index,
          env: name,
          language: data.locale,
        };
      })
    }
    tableData = await Promise.all(tableData);
    return tableData;
  }

  async function getEnvironmentName(environment: any) {
    var config = {
      method: 'GET',
      url: 'https://api.contentstack.io/v3/environments',
      headers: {
        'api_key': '',
        'authorization': '',
        'Content-Type': 'application/json',
      }
    };

    const response = await axios(config)
    for (let i = 0; i < response.data.environments.length; i++) {
      let env = response.data.environments[i];
      if (env.uid === environment.environment) {
        return env.name;
      }
    }
  }

  const columns = [
    {
      Header: 'Language',
      id: 'language',
      accessor: "language",
    },
    {
      Header: 'Environment',
      id: "env",
      accessor: "env",
    }
  ]

  return (
    <div className="extension-wrapper">
      <InfiniteScrollTable
        columnSelector={function noRefCheck() { }}
        columns={columns}
        data={tableData}
        fetchTableData={fetchData}
        equalWidthColumns={true}
        itemStatusMap={{
          '0': 'loaded',
          '1': 'loaded',
          '2': 'loaded',
          '3': 'loaded',
        }}
        loadMoreItems={function noRefCheck() { }}
        loading={loading}
        searchPlaceholder="Search"
        totalCounts={count}
        uniqueKey="index"
      />
    </div>
  );
};

export default EntrySidebarExtension;
