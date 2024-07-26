import { FC, useEffect, useRef, useState } from 'react';
import { SearchComponent } from '../../_metronic/assets/ts/components';
import { KTIcon } from '../../_metronic/helpers';
import { search } from '../modules/auth/core/_requests'; // Ensure this path is correct

const Search: FC = () => {
  const [menuState] = useState<'main' | 'advanced' | 'preferences'>('main');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const element = useRef<HTMLDivElement | null>(null);
  const wrapperElement = useRef<HTMLDivElement | null>(null);
  const resultsElement = useRef<HTMLDivElement | null>(null);
  const suggestionsElement = useRef<HTMLDivElement | null>(null);
  const emptyElement = useRef<HTMLDivElement | null>(null);

  const processs = (searchComponent: SearchComponent) => {
    const query = (searchComponent.getQuery() || '').trim();

    if (!query) {
      clear();
      return;
    }

    setLoading(true);
    search(query)
      .then(response => {
        console.log(response);
        
        const results = response.map((item: any) => ({
            name: item.TerminalName,
            image: item.Image || 'default-image-url', 
            wrioCode: item.WrioCode
          }));
       
        setSearchResults(results);
        console.log(results);
        
        setError(null);
        setLoading(false);
        if (results.length > 0) {
          resultsElement.current!.classList.remove('d-none');
          emptyElement.current!.classList.add('d-none');
        } else {
          resultsElement.current!.classList.add('d-none');
          emptyElement.current!.classList.remove('d-none');
        }
      })
      .catch(err => {
        setError('An error occurred while fetching search results.');
        setLoading(false);
        resultsElement.current!.classList.add('d-none');
        emptyElement.current!.classList.remove('d-none');
      })
      .finally(() => {
        searchComponent.complete();
      });
  };

  const clear = () => {
    setSearchResults([]);
    setError(null);
    setLoading(false);
    suggestionsElement.current!.classList.remove('d-none');
    resultsElement.current!.classList.add('d-none');
    emptyElement.current!.classList.add('d-none');
  };

  useEffect(() => {
    const searchObject = SearchComponent.createInsance('#kt_header_search');
    searchObject!.on('kt.search.process', processs);
    searchObject!.on('kt.search.clear', clear);
  }, []);

  return (
    <>
      <div
        id='kt_header_search'
        className='d-flex align-items-stretch'
        data-kt-search-keypress='true'
        data-kt-search-min-length='2'
        data-kt-search-enter='enter'
        data-kt-search-layout='menu'
        data-kt-menu-trigger='auto'
        data-kt-menu-overflow='false'
        data-kt-menu-permanent='true'
        data-kt-menu-placement='bottom-end'
        ref={element}
      >
        <div
          className='d-flex align-items-center'
          data-kt-search-element='toggle'
          id='kt_header_search_toggle'
        >
          <div className='btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px'>
            <KTIcon iconName='magnifier' className='fs-2' />
          </div>
        </div>

        <div
          data-kt-search-element='content'
          className='menu menu-sub menu-sub-dropdown p-7 w-325px w-md-375px'
        >
          <div
            className={`${menuState === 'main' ? '' : 'd-none'}`}
            ref={wrapperElement}
            data-kt-search-element='wrapper'
          >
            <form
              data-kt-search-element='form'
              className='w-100 position-relative mb-3'
              autoComplete='off'
            >
              <KTIcon
                iconName='magnifier'
                className='fs-2 text-lg-1 text-gray-500 position-absolute top-50 translate-middle-y ms-0'
              />

              <input
                type='text'
                className='form-control form-control-flush ps-10'
                name='search'
                placeholder='Search...'
                data-kt-search-element='input'
              />

              <span
                className={`position-absolute top-50 end-0 translate-middle-y lh-0 ${loading ? '' : 'd-none'} me-1`}
                data-kt-search-element='spinner'
              >
                <span className='spinner-border h-15px w-15px align-middle text-gray-500' />
              </span>

              <span
                className={`btn btn-flush btn-active-color-primary position-absolute top-50 end-0 translate-middle-y lh-0 ${!searchResults.length ? 'd-none' : ''}`}
                data-kt-search-element='clear'
                onClick={clear}
              >
                <KTIcon iconName='cross' className='fs-2 text-lg-1 me-0' />
              </span>

              <div
                className='position-absolute top-50 end-0 translate-middle-y'
                data-kt-search-element='toolbar'
              >
                {/* Toolbar content */}
              </div>
            </form>
            <div ref={resultsElement} data-kt-search-element='results' className={`d-none ${loading ? 'd-none' : ''}`}>
              <div className='scroll-y mh-200px mh-lg-350px'>
                <h3 className='fs-5 text-muted m-0 pb-5' data-kt-search-element='category-title'>
                  Results
                </h3>

                {searchResults.length > 0 ? (
                  searchResults.map((result, index) => (
                    <a
                      key={index}
                      href='/#'
                      className='d-flex text-gray-900 text-hover-primary align-items-center mb-5'
                    >
                      <div className='symbol symbol-40px me-4'>
                        <img src={result.image} alt={result.name} />
                      </div>

                      <div className='d-flex flex-column justify-content-start fw-bold'>
                        <span className='fs-6 fw-bold'>{result.name}</span>
                        <span className='fs-7 fw-bold text-muted'>{result.wrioCode}</span>
                      </div>
                    </a>
                  ))
                ) : (
                  <div className='text-center'>
                    <p>No results found</p>
                  </div>
                )}
              </div>
            </div>

            <div ref={suggestionsElement} className='mb-4' data-kt-search-element='main'>
              <div className='d-flex flex-stack fw-bold mb-4'>
                <span className='text-muted fs-6 me-2'>Recently Searched:</span>
              </div>

              <div className='scroll-y mh-200px mh-lg-325px'>
                {/* Recently searched items */}
              </div>
            </div>

            <div ref={emptyElement} data-kt-search-element='empty' className={`text-center d-none ${!searchResults.length && !loading ? '' : 'd-none'}`}>
              <div className='pt-10 pb-10'>
                <KTIcon iconName='search-list' className='fs-4x opacity-50' />
              </div>

              <div className='pb-15 fw-bold'>
                <h3 className='text-gray-600 fs-5 mb-2'>No result found</h3>
                <div className='text-muted fs-7'>Please try again with a different query</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Search };