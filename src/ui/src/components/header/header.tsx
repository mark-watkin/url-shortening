import './header.css';

export interface HeaderProps {
    title: string;
}

export const Header: React.FC<HeaderProps> = ({title}) =>  {
    return <header className="header">
        <div className="header-title">
            {title}
        </div>
    </header>
}