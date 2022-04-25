import { useEffect, useState } from "react";
import { getUrls, postUrl } from "../../api/api";
import { Container } from "../../components/container";
import { Form } from "../../components/form";
import { List, ListItem } from "../../components/list";
import { Pannel } from "../../components/pannel";
import { Url } from "../../models/ulr";

export const UrlShorener: React.FC = () =>  {
    const [urls, setUrls] = useState<Url[]>([]);
    const [isInvalid, setIsInvalid] = useState<boolean>(false);

    useEffect(() => {
        const fetchUrls = async () => {
            const responseUrls = await (await getUrls()).sort((first, second) => second.id - first.id);
            console.log('result from get urls', responseUrls);
            setUrls(responseUrls)
        }
        fetchUrls();
    }, []);

    return <Container>
        <Pannel>
            <Form 
                inputHint="Enter a url to shorten!" 
                submitText="Submit" 
                invalidText="The url that you have entered is not valid. Dont forget to include the protocol!"
                isInvalid={isInvalid}
                onSubmit={async (inputText) => {
                    console.log('hello', inputText);
                    try {
                        const result = await postUrl({original: inputText!});
                        console.log('result from submit', result)
                        setIsInvalid(false);
                        setUrls([result, ...urls])
                    } catch {
                        setIsInvalid(true);
                    }
                
            }}/>
        </Pannel>
        {
            urls.length > 0 ?
                <Pannel>
                    <List>
                        {urls.map(u => <ListItem primaryText={u.shortened} secondaryText={u.original} key={u.id}/>)}
                    </List>
                </Pannel> : null
        }
    </Container>
}