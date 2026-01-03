//import scss file
import '/src/assets/styles/pages/_home.scss'


const Home = () => {

    return (
        <main className="page">
            <div className='page__left'>
                <div className='page__left--intro'>
                    _hi my name is
                </div>

                <div className='page__left--header'>
                    ~ Michael Crowe
                </div>

                <div className='page__left--title'>
                    [Cyber Security Professional] && [Junior Developler]
                </div>

                <div className='page__left--details'>
                    <p>/Interests/ </p>
                    <ul>
                        <li>
                            Cyber Security
                        </li>
                        <li>
                            Web Development
                        </li>
                        <li>
                            AI Development & Engineering (Learning)
                        </li>
                    </ul>
                </div>
            </div>


        </main>
    )    
}

export default Home