//app\signin\Form.tsx
'use client'
 
import Link from 'next/link'
 
const Form = () => {
    return (
        <div className="max-w-sm  mx-auto card bg-base-300">
            <div className="card-body">
                <h1 className="card-title">Sign in</h1>
                <form>
                    <div className="my-2">
                        <label className="label" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            className="input input-bordered w-full max-w-sm"
                        />
                    </div>
                    <div className="my-2">
                        <label className="label" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="input input-bordered w-full max-w-sm"
                        />
                    </div>
                    <div className="my-4">
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
                <div>
                    <Link className="link" href={'/register'}>
                        Register
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Form