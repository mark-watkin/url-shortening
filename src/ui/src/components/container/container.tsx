import './container.css';

export interface ContainerProps {
    children?: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({children}) =>  {
    return <div className="container">
        {children}
    </div>
}