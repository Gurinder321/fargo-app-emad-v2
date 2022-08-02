import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { db } from '../../firebase.config';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { collection, onSnapshot } from 'firebase/firestore';

export default function Register() {
  const [confirmData, setConfirmData] = useState();
  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    country: '',
    password: '',
    network: '',
    industry: '',
    amount: '',
    image: '',
    headline: '',
    profile: '',
    isApproved: false,
  });

  const stepMap = {
    1: <StepOne setUserInfo={setUserInfo} userInfo={userInfo} />,
    2: <StepTwo setUserInfo={setUserInfo} userInfo={userInfo} />,
    3: <StepThree setUserInfo={setUserInfo} userInfo={userInfo} step={step} setStep={setStep} />,
    4: <StepFour userInfo={userInfo} />,
  };

  return (
    <div>
      {stepMap[step]}
      {step > 1 && step <= 3 && (
        <button
          className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-96"
          onClick={() => {
            setStep(step - 1);
          }}
        >
          Prev
        </button>
      )}
      {step < 3 ? (
        <button
          className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-96 "
          onClick={() => {
            setStep(step + 1);
          }}
        >
          Next
        </button>
      ) : null}
    </div>
  );
}

function StepOne(props) {
  // const navigate = useNavigate();
  const name = useRef('');
  const email = useRef('');
  const country = useRef('');
  const password = useRef('');

  useEffect(() => {
    if (props.userInfo.name) {
      name.current.value = props.userInfo.name;
    }
    if (props.userInfo.email) {
      email.current.value = props.userInfo.email;
    }
    if (props.userInfo.country) {
      country.current.value = props.userInfo.country;
    }
    if (props.userInfo.password) {
      password.current.value = props.userInfo.password;
    }
  }, []);
  return (
    <Layout>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 h-full bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register Step 1
          </h2>
          <form className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Full name
                </label>
                <input
                  ref={name}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Full name"
                  onChange={(event) => {
                    props.setUserInfo((prevState) => {
                      return { ...prevState, name: event.target.value };
                    });
                  }}
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  ref={email}
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  onChange={(event) => {
                    props.setUserInfo((prevState) => {
                      return { ...prevState, email: event.target.value };
                    });
                  }}
                />
              </div>
              <div>
                <label htmlFor="country" className="sr-only">
                  Country
                </label>
                <input
                  ref={country}
                  type="text"
                  placeholder="Country"
                  autoComplete="country"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  onChange={(event) => {
                    props.setUserInfo((prevState) => {
                      return { ...prevState, country: event.target.value };
                    });
                  }}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  ref={password}
                  type="password"
                  placeholder="Password"
                  onChange={(event) => {
                    props.setUserInfo((prevState) => {
                      return { ...prevState, password: event.target.value };
                    });
                  }}
                  autoComplete="country"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>

            <p>
              Already have an account?
              <a href="/signin" className="text-indigo-500">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
}

function StepTwo(props) {
  // const navigate = useNavigate();
  const network = useRef('');
  const industry = useRef('');
  const amount = useRef('');

  useEffect(() => {
    if (props.userInfo.network) {
      network.current.value = props.userInfo.network;
    }
    if (props.userInfo.industry) {
      industry.current.value = props.userInfo.industry;
    }
    if (props.userInfo.amount) {
      amount.current.value = props.userInfo.amount;
    }
  }, []);
  return (
    <Layout>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 h-full bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register Step 2
          </h2>
          <form className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="network" className="sr-only">
                  Network
                </label>
                <input
                  ref={network}
                  id="network"
                  name="network"
                  type="text"
                  autoComplete="Network"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Network"
                  onChange={(event) => {
                    props.setUserInfo((prevState) => {
                      return { ...prevState, network: event.target.value };
                    });
                  }}
                />
              </div>
              <div>
                <label htmlFor="industry" className="sr-only">
                  Industry
                </label>
                <input
                  ref={industry}
                  type="text"
                  placeholder="Industry"
                  autoComplete="industry"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  onChange={(event) => {
                    props.setUserInfo((prevState) => {
                      return { ...prevState, industry: event.target.value };
                    });
                  }}
                />
              </div>
              <div>
                <label htmlFor="amount" className="sr-only">
                  Funding amount
                </label>
                <input
                  ref={amount}
                  type="text"
                  placeholder="Funding Amount"
                  autoComplete="amount"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  onChange={(event) => {
                    props.setUserInfo((prevState) => {
                      return { ...prevState, amount: event.target.value };
                    });
                  }}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

function StepThree(props) {
  const { name, email, password } = props.userInfo;

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      console.log(userCredential, props.userInfo);

      const user = userCredential.user;

      updateProfile(auth.currentUser, { displayName: name });
      const formDataCopy = { ...props.userInfo };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, 'user', user.uid), formDataCopy);
      // navigate('/');
      // alert('Signup Success');
      props.setStep(props.step + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const image = useRef('');
  const headline = useRef('');
  const profile = useRef('');

  useEffect(() => {
    if (props.userInfo.image) {
      image.current.value = props.userInfo.image;
    }
    if (props.userInfo.headline) {
      headline.current.value = props.userInfo.headline;
    }
    if (props.userInfo.profile) {
      profile.current.value = props.userInfo.profile;
    }
  }, []);

  return (
    <Layout>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 h-full bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register Step 3
          </h2>
          <form className="mt-8 space-y-6" onSubmit={onSubmitHandler}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="image" className="sr-only">
                  Image
                </label>
                <input
                  ref={image}
                  type="file"
                  id="image"
                  name="image"
                  autoComplete="image"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Image"
                  onChange={(event) => {
                    props.setUserInfo((prevState) => {
                      return { ...prevState, image: event.target.value };
                    });
                  }}
                />
              </div>
              <div>
                <label htmlFor="headline" className="sr-only">
                  Ad Headline
                </label>
                <input
                  ref={headline}
                  type="text"
                  placeholder="Ad Headline"
                  autoComplete="headline"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  onChange={(event) => {
                    props.setUserInfo((prevState) => {
                      return { ...prevState, headline: event.target.value };
                    });
                  }}
                />
              </div>
              <div>
                <label htmlFor="profile" className="sr-only">
                  Profile Ad
                </label>

                <textarea
                  ref={profile}
                  id="message"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Profile Ad"
                  onChange={(event) => {
                    props.setUserInfo((prevState) => {
                      return { ...prevState, profile: event.target.value };
                    });
                  }}
                ></textarea>
              </div>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

function StepFour(props) {
  console.log(props.userInfo.name);
  const [user, setUser] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    // fetchUsers();
    onSnapshot(collection(db, 'user'), (snapshot) =>
      setUser(
        snapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((u) => u.id === auth.currentUser.uid)[0]
      )
    );
  }, []);
  console.log('Logged:', user.isApproved);
  const navigate = useNavigate();
  const handleConfirm = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        alert('User signed out ');
        navigate('/signin', { state: { name: user.name } });
      })

      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <>
      <Layout>
        <h1 className="flex justify-center text-3xl">Step 4</h1>
        <div className="flex justify-center">
          <ul className="bg-white rounded-lg w-96 text-gray-900">
            <li className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">
              <strong>Name: </strong>
              {user.name}
            </li>
            <li className="px-6 py-2 border-b border-gray-200 w-full">
              <strong>Email: </strong>
              {user.email}
            </li>

            <li className="px-6 py-2 border-b border-gray-200 w-full">
              <strong>Country: </strong>
              {user.country}
            </li>

            <li className="px-6 py-2 border-b border-gray-200 w-full">
              <strong>Password: </strong>
              {user.password}
            </li>

            <li className="px-6 py-2 border-b border-gray-200 w-full">
              <strong>Network: </strong>
              {user.network}
            </li>

            <li className="px-6 py-2 border-b border-gray-200 w-full">
              <strong>Industry: </strong>
              {user.industry}
            </li>

            <li className="px-6 py-2 border-b border-gray-200 w-full">
              <strong>Amount: </strong>
              {user.amount}
            </li>
            <li className="px-6 py-2 border-b border-gray-200 w-full">
              <strong>Image: </strong>
              {user.image}
            </li>
            <li className="px-6 py-2 border-b border-gray-200 w-full">
              <strong>Headline: </strong>
              {user.headline}
            </li>
            <li className="px-6 py-2 border-b border-gray-200 w-full">
              <strong>Profile: </strong>
              {user.profile}
            </li>
            <li className="px-6 py-2 w-full rounded-b-lg">
              <strong>Profile: </strong>
              {user.profile}
            </li>
          </ul>
        </div>
        <div className="flex justify-center">
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      </Layout>
    </>
  );
}
