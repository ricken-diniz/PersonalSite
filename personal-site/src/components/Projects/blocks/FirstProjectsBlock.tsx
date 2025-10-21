import '../../../assets/css/project-blocks.css'
import { useState, lazy, Suspense, createContext, useEffect } from 'react';


type ViewId = 'chess' | 'eto-calc' | 'xai' | 'chatbot' | 'vozia' | 'autohouse';

export const TriggerCContext = createContext<() => void>(() => {});

const LazyViews = {
    'clean': lazy(() => Promise.resolve({ default: () => <></> })),
    'chess': lazy(() => import('./projects/Chess')),
    'eto-calc': lazy(() => import('./projects/ETo')),
    'xai': lazy(() => import('./projects/Xai')),
    'chatbot': lazy(() => import('./projects/Chatbot')),
    'vozia': lazy(() => import('./projects/Vozia')),
    'autohouse': lazy(() => import('./projects/AutoHouse')),
} as const;

let oldId: string = 'chess';


function FirstProjectsBlock() {
    const [current, setCurrent] = useState<ViewId>();
    const [toggle, setToggle] = useState<boolean>(false);
    const [childKey, setChildKey] = useState<number>(0);

    const trigger = () => { setToggle(true); }
    useEffect(() => {
        if (toggle) {
            setToggle(false);
            setChildKey(prevKey => prevKey + 1);
        }
    }, [toggle]);

    const switchView = (key: string) => {
        document.getElementById(oldId)?.style.setProperty('opacity', '0.2');
        oldId = key;
        document.getElementById(key)?.style.setProperty('opacity', '1');
        setCurrent(key as ViewId);
    }

    return (
    <>
        <div className='projects-icons'>
            <div className='icon-p' onClick={() => switchView('chess')} id='chess'></div>
            <div className='icon-p' onClick={() => switchView('vozia')} id='vozia'></div>
            <div className='icon-p' onClick={() => switchView('eto-calc')} id='eto-calc'></div>
            <div className='icon-p' onClick={() => switchView('xai')} id='xai'></div>
            <div className='icon-p' onClick={() => switchView('chatbot')} id='chatbot'></div>
            <div className='icon-p' onClick={() => switchView('autohouse')} id='autohouse'></div>
        </div>

        <Suspense fallback={<h2>Loading...</h2>}>
            {(() => {
                const Comp = LazyViews[current || 'chess'];
                return (
                    <TriggerCContext.Provider value={trigger}>
                        <Comp key={childKey}/>
                    </TriggerCContext.Provider>
                );
            })()}
        </Suspense>
        
    </>
    );
}


export default FirstProjectsBlock
