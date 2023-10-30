import lodash from 'lodash';

console.log(
    lodash.words('W. E. B. Du Bois – William Edward Burghardt Du Bois;')
        .map(
            (word) => 
                lodash.upperCase(word)
        ) 
);
