import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Welcome () {
	const session = useSession()
	const router = useRouter();

	useEffect(() => {
		console.log('session',session);
		if(!session?.accessToken) {
			router.push('/login')
		}
	}, [session]);

	return (
		<div >
			<h1>Welcome Page</h1>
			<button onClick={() => signOut()}>Log Out</button>
		</div>
	)
}
  