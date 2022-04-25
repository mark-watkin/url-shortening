import './button.css';

export interface ButtonProps {
    text: string;
}

export const Button: React.FC<ButtonProps> = ({text}) =>  {
    return <button className="button">
        {text}
    </button>
}