import './pannel.css';

export interface PannelProps {
    children?: React.ReactNode;
}

export const Pannel: React.FC<PannelProps> = ({children}) =>  {
    return <div className="pannel">
        {children}
    </div>
}