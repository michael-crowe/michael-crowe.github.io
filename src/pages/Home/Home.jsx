//import scss file
import '/src/assets/styles/pages/_home.scss'


const Home = () => {

    return (
        <main className="page__left">
            <div className='page__intro'>
                _hi my name is
            </div>

            <div className='page__header'>
                ~ Michael Crowe
            </div>

            <div className='page__title'>
                [Cyber Security Professional] && [Junior Developler]
            </div>

            <div className='page__details'>
                <p>/Interests/ </p>
                <ul>
                    <li>
                        Web Development
                    </li>
                    <li>
                        Cyber Security
                    </li>
                    <li>
                        AI Development (Learning)
                    </li>
                </ul>
            </div>

        </main>
    )    
}

export default Home