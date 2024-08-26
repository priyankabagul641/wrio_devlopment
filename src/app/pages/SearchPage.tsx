import React, { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import { KTIcon } from '../../_metronic/helpers';
import { search, getrecentsearch, getTerminalById, getAccountInfo } from '../modules/auth/core/_requests';
import { SearchComponent } from '../../_metronic/assets/ts/components';
import { TerminalDetail } from '../modules/auth';

interface UserAccount {
  UserRole: string;
  UserId: number;
}

const Search: FC = () => {
  const [menuState] = useState<'main' | 'advanced' | 'preferences'>('main');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [recentSearchResults, setRecentSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [accessKey, setAccessKey] = useState<string>('');
  const [selectedWrioCode, setSelectedWrioCode] = useState<string>('');
  const element = useRef<HTMLDivElement | null>(null);
  const wrapperElement = useRef<HTMLDivElement | null>(null);
  const resultsElement = useRef<HTMLDivElement | null>(null);
  const suggestionsElement = useRef<HTMLDivElement | null>(null);
  const emptyElement = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const userAccount: UserAccount = JSON.parse(sessionStorage.getItem('CurrentUserInfo') || '{}');

  const processs = (searchComponent: SearchComponent) => {
    const query = (searchComponent.getQuery() || '').trim();

    if (!query) {
      clear();
      return;
    }

    setLoading(true);
    search(query)
      .then((response) => {
        const results = response.map((item: any) => ({
          name: item.TerminalName,
          image: item.Image,
          wrioCode: item.WrioCode,
          IsPrivate: item.IsPrivate,
          Status: item.Status,
        }));
        
        setSearchResults(results);
        setError(null);
        setLoading(false);

        if (results.length > 0) {
          if (resultsElement.current) {
            resultsElement.current.classList.remove('d-none');
          }
          if (emptyElement.current) {
            emptyElement.current.classList.add('d-none');
          }
        } else {
          if (resultsElement.current) {
            resultsElement.current.classList.add('d-none');
          }
          if (emptyElement.current) {
            emptyElement.current.classList.remove('d-none');
          }
        }
      })
      .catch((err: any) => {
        setError('An error occurred while fetching search results.');
        setLoading(false);

        if (resultsElement.current) {
          resultsElement.current.classList.add('d-none');
        }
        if (emptyElement.current) {
          emptyElement.current.classList.remove('d-none');
        }
      })
      .finally(() => {
        searchComponent.complete();
      });
  };

  const recentSearchTerminals = async () => {
    try {
      const recentResults = await getrecentsearch(userAccount.UserId);
      const recentSearchResults = recentResults.data.map((item: any) => ({
        name: item.TerminalName,
        image: item.Image,
        wrioCode: item.WrioCode,
      }));
      setRecentSearchResults(recentSearchResults);
    } catch (error) {
      setError('An error occurred while fetching recent searches.');
    }
  };

  const clear = () => {
    setSearchResults([]);
    setError(null);
    setLoading(false);
    if (suggestionsElement.current) {
      suggestionsElement.current.classList.remove('d-none');
    }
    if (resultsElement.current) {
      resultsElement.current.classList.add('d-none');
    }
    if (emptyElement.current) {
      emptyElement.current.classList.add('d-none');
    }
  };

  useEffect(() => {
    recentSearchTerminals();
  }, []);

  useEffect(() => {
    const searchObject = SearchComponent.createInsance('#kt_header_search');
    
    if (searchObject) {
      searchObject.on('kt.search.process', processs as any);
      searchObject.on('kt.search.clear', clear as any);

      return () => {
        searchObject.off('kt.search.process', processs as any);
        searchObject.off('kt.search.clear', clear as any);
      };
    }
  }, []);

  const handleResultClick = async (wrioCode: string, isPrivate: boolean, status: string) => {
    if (status === 'ON') {
      if (!isPrivate) {
        navigate(`/productPage/${wrioCode}`);
      } else {
        setSelectedWrioCode(wrioCode);
        setShowModal(true);
      }
    } else {
      console.log('Currently, this terminal is closed');
    }
  };

  const handleAccessKeySubmit = async () => {
    const terminalData = await getTerminalById(selectedWrioCode);

    if (terminalData) {
      const accountInfo = await getAccountInfo(terminalData.AccountId);

      if (accountInfo) {
        terminalData.MobileNo = accountInfo.MobileNo;
        terminalData.Name = accountInfo.BusinessName;
        terminalData.EmailId = accountInfo.EmailId;
        terminalData.Address = accountInfo.Address;
        terminalData.City = accountInfo.City;
        terminalData.Zip = accountInfo.Zip;
        terminalData.State = accountInfo.State;
        terminalData.Country = accountInfo.Country;

        sessionStorage.setItem('terminal', JSON.stringify(terminalData));
        sessionStorage.setItem('terminalCachedDate', JSON.stringify(new Date().toISOString()));

        const storedAccessKey = JSON.parse(localStorage.getItem('accesskey') || '[]');
        const accessKeyValid = storedAccessKey.some(
          (key: any) => key.Id === selectedWrioCode && key.Key === terminalData.TerminalAccessKey
        );

        if (!accessKeyValid) {
          localStorage.setItem(
            'accesskey',
            JSON.stringify([...storedAccessKey, { Id: selectedWrioCode, Key: accessKey }])
          );
        }

        if (accessKey === terminalData.TerminalAccessKey) {
          navigate(`/productPage/${selectedWrioCode}`);
          setShowModal(false);
        } else {
          alert('Access key is incorrect.');
        }
      }
    }
  };

  return (
    <>
      <div
        id="kt_header_search"
        className="d-flex align-items-stretch"
        data-kt-search-keypress="true"
        data-kt-search-min-length="3"
        data-kt-search-enter="enter"
        data-kt-search-layout="menu"
        data-kt-menu-trigger="auto"
        data-kt-menu-overflow="false"
        data-kt-menu-permanent="true"
        data-kt-menu-placement="bottom-end"
        ref={element}
      >
        <div
          className="d-flex align-items-center"
          data-kt-search-element="toggle"
          id="kt_header_search_toggle"
        >
          <div className="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px">
            <KTIcon iconName="magnifier" className="fs-2" />
          </div>
        </div>

        <div
          data-kt-search-element="content"
          className="menu menu-sub menu-sub-dropdown p-7 w-325px w-md-375px"
        >
          <div
            className={`${menuState === 'main' ? '' : 'd-none'}`}
            ref={wrapperElement}
            data-kt-search-element="wrapper"
          >
            <form
              data-kt-search-element="form"
              className="w-100 position-relative mb-3"
              autoComplete="off"
            >
              <KTIcon
                iconName="magnifier"
                className="fs-2 text-lg-1 text-gray-500 position-absolute top-50 translate-middle-y ms-0"
              />

              <input
                type="text"
                className="form-control form-control-flush ps-10"
                name="search"
                placeholder="Search..."
                data-kt-search-element="input"
              />

              <span
                className={`position-absolute top-50 end-0 translate-middle-y lh-0 ${
                  loading ? '' : 'd-none'
                }`}
                data-kt-search-element="spinner"
              >
                <KTIcon iconName="spinner" className="fs-2 text-gray-500" />
              </span>
            </form>

            <div
              ref={resultsElement}
              data-kt-search-element="results"
              className={`d-none`}
            >
              <div className="scroll-y mh-200px mh-lg-350px">
                {searchResults.map((item, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center mb-5"
                    onClick={() => handleResultClick(item.wrioCode, item.IsPrivate, item.Status)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="symbol symbol-40px me-4">
                      <img src={item.image} alt="" />
                    </div>

                    <div className="d-flex flex-column">
                      <span className="fs-6 fw-bold text-gray-800 text-hover-primary">
                        {item.name}
                      </span>
                      <span className="fw-semibold text-gray-400">
                        Wrio Code: {item.wrioCode}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              ref={suggestionsElement}
              data-kt-search-element="suggestions"
              className={`pt-3 ${recentSearchResults.length > 0 ? '' : 'd-none'}`}
            >
              <h3 className="fw-bold mb-5">Recently Searched:</h3>

              {recentSearchResults.map((item, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center mb-5"
                  onClick={() => handleResultClick(item.wrioCode, false, 'ON')}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="symbol symbol-40px me-4">
                    <img src={item.image} alt="" />
                  </div>

                  <div className="d-flex flex-column">
                    <span className="fs-6 fw-bold text-gray-800 text-hover-primary">
                      {item.name}
                    </span>
                    <span className="fw-semibold text-gray-400">
                      Wrio Code: {item.wrioCode}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div
              ref={emptyElement}
              data-kt-search-element="empty"
              className={`text-center d-none`}
            >
              <div className="pt-10 pb-10">
                <KTIcon iconName="element-plus" className="fs-4x opacity-50" />
              </div>

              <div className="pb-15 fw-bold">
                <h3>No search results found</h3>
                <div className="text-muted fs-6">Try searching with a different term</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Access Key */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Enter Access Key</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Access Key</Form.Label>
            <Form.Control
              type="text"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAccessKeySubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { Search };
