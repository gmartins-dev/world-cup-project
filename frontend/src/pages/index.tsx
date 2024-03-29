import Image from "next/image";
import appPreviewImg from '../assets/app-nlw-copa-preview.png';
import logoImg from '../assets/logo.svg';
import usersAvatarExampleImg from '../assets/users-avatar-example.png';
import iconCheckImg from '../assets/icon-check.svg';
import { api } from "../lib/axios";
import { FormEvent, useState } from "react";

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('')

  async function createPool(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post('/pools', {
        title: poolTitle
      })

      const { code } = response.data;

      await navigator.clipboard.writeText(code);

      alert('Pool successfully created, the code has been copied to the transfer area!');

      setPoolTitle('')
    } catch (err) {
      console.log(err);
      alert('Failure when creating the pool, try again!')
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={logoImg} alt="NLW Copa" />

        <h1 className="text-5xl font-bold leading-tight text-white mt-14">
          Create your own World Cup Pool and share wih your friends!
        </h1>

        <div className="flex items-center gap-2 mt-10">
          <Image src={usersAvatarExampleImg} alt="" />

          <strong className="text-xl text-gray-100">
            <span className="text-ignite-500">+{props.userCount}</span> people are already using
          </strong>
        </div>

        <form onSubmit={createPool} className="flex gap-2 mt-10">
          <input
            className="flex-1 px-6 py-4 text-sm text-gray-100 bg-gray-800 border border-gray-600 rounded"
            type="text"
            required
            placeholder="What name of your Pool?"
            value={poolTitle}
            onChange={event => setPoolTitle(event.target.value)}
          />
          <button
            className="px-6 py-4 text-sm font-bold text-gray-900 uppercase bg-yellow-500 rounded hover:bg-yellow-700"
            type="submit"
          >
            Create new Pool
          </button>
        </form>

        <p className="mt-4 text-sm leading-relaxed text-gray-300">
          After creating your Pool, you will receive a unique code you can use to invite others 🚀
        </p>

        <div className="flex items-center justify-between pt-10 mt-10 text-gray-100 border-t border-gray-600">
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold">+{props.poolCount}</span>
              <span>Pools created</span>
            </div>
          </div>

          <div className="w-px bg-gray-600 h-14" />

          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold">+{props.guessCount}</span>
              <span>Posted guesses</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewImg}
        alt="Two cell phones displaying a preview of the application BeMyGuess"
        quality={100}
      />
    </div>
  )
}

export const getServerSideProps = async () => {
  const [
    poolCountResponse,
    guessCountResponse,
    userCountResponse
  ] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count'),
  ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    }
  }
}
