import Icon from '../images/Icon.svg';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
} from 'react-instantsearch-hooks-web';
import { useEffect, useState } from 'react';
import ContentstackAppSDK from '@contentstack/app-sdk';
import parse from 'html-react-parser';
import 'instantsearch.css/themes/satellite.css';

const searchClient = algoliasearch('ZXYH5BFSLN', 'b04bcf56067455ad754a61b5028fe8df');

function Hit({ hit }: { hit: any }) {
  return (
    <article>
      <h4>
        <Highlight attribute="title" hit={hit} />
      </h4>
      {parse(hit.response)}
      <p> Category: {hit.category}  </p>
    </article>
  );
}

function StackDashboardExtension() {

  useEffect(() => {
    ContentstackAppSDK.init().then((sdk) => {
      // The snapshot of referenced DOM Element will render in-place of custom field when modal is opened
      sdk?.location?.DashboardWidget?.frame.updateHeight(5000)
    })

  }, []);

  return (
    
    <div style={{ "padding": "35px" }}>
      <InstantSearch
        searchClient={searchClient}
        indexName="sa-wiki"
        initialUiState={{
          indexName: {
            query: 'none',
            page: 0,
          },
        }}>
        <SearchBox />
        <Hits hitComponent={Hit} />
        <Configure hitsPerPage={5} />
        <Pagination />
      </InstantSearch>
    </div>

  );

};

export default StackDashboardExtension;
