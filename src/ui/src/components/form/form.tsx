import { useRef } from 'react';
import { Button } from '../button';
import './form.css';

export interface FormProps {
    inputHint: string;
    submitText: string;
    invalidText: string;
    isInvalid: boolean;
    onSubmit: (value: string | undefined) => Promise<any>;
}

export const Form: React.FC<FormProps> = ({inputHint, submitText, invalidText, isInvalid, onSubmit}) =>  {
    const input: React.RefObject<HTMLInputElement> = useRef(null);
    
    return <div>
        <form className='form' onSubmit={async (e) => {
            e.preventDefault(); 
            await onSubmit(input.current?.value);
        }}>
            <input className={`form-input ${isInvalid ? 'form-input-invalid' : ''}`} name="url" placeholder={inputHint} ref={input} />
            <Button text={submitText} />
        </form>
        <div className='form-input-invalid-text'>{isInvalid ? invalidText : ''}</div>
    </div>
}