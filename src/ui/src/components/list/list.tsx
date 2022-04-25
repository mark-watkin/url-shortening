import './list.css';

export interface ListItemProps {
    primaryText: string;
    secondaryText: string;
}

export interface ListProps {
    children?: React.ReactNode;
}

export const List: React.FC<ListProps> = ({children}) =>  {
    return <div className="list">
        {children}
    </div>
}

export const ListItem: React.FC<ListItemProps> = ({primaryText, secondaryText}) =>  {
    return <div className="list-item">
        <div className="list-item-primary">{primaryText}</div>
        <div className="list-item-secondary">{secondaryText}</div>    
    </div>
}