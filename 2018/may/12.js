// Currying

const _ = require('partial-js');

{
    // 간단히 구현가능한 커링 => 직접 구현
    const add = a => b => a + b;

    console.log(`Basic Currying Example '${add(3)(5)}'`);
}

{
    // 여러개의 인자를 갖는 함수를 커링으로 만들어주는 함수
    const curry = (f) => function c(...args) {
        return args.length === f.length ?
            f(...args) :
            (...rest) => c(...args, ...rest);
    }

    const curryr = (f) => function c(...args) {
        return args.length === f.length ?
            f(...args) :
            (...rest) => c(...rest, ...args);
    }

    const five = curry((a, b, c, d, e) => a + b - c - d + e);
    const six = curryr((a, b, c, d, e, f) => console.log(a, b, c, d, e, f))

    // curry 는 어떤 갯수로 실행해도 인자 순서 안바뀌고 동작
    console.log(
        five(1, 2, 3)(4, 5)
    );

    console.log(
        five(1, 2)(3)(4, 5)
    );

    // curryr 는 1개씩 실행이 아니면 순서가 꼬일 확률이 높음 -> 2개 이상의 오른쪽 커링은 주의해서 쓸것
    console.log(
        six(1, 2, 3)(4, 5)(6)
    );

    console.log(
        six(1)(2, 3, 4)(5, 6)
    );
}


{
    // arity 개수 알아보기
    function three(a, b, c) {} // three.length === arity => 3

    const two = (a, b) => {} // two.length === arity => 2

    const dynamic = (...args) => _.filter(args, a => a > 5); // dynamic.length === arity => 0
}

{
    // currying 을 지원할 함수를 만들때 인자들의 순서? => data 가 가장 마지막에 들어올 수 있는 형태여야 사용이 편할 것
    const curry = (f) => function c(...args) {
        return args.length === f.length ?
            f(...args) :
            (...rest) => c(...args, ...rest);
    }
    
    const ryan = { id: 10, name: 'ryan', age: 24, role: 'admin' };
    const henry = { id: 11, name: 'henry', age: 26, role: 'partner' };

    const data = {
        n: 10
    };

    const limitFromRole = curry((f, predi, user, data) => predi(user) ? f(data) : data);
    const assign = curry((key, val, obj) => { obj[key] = val; return obj; });


    const isAdmin = user => user.role === 'admin';

    // pipe 라인을 탈 때 data 가 위에서 내려오므로 사용하기 편리
    limitFromRole(d => assign('n', d.n + 1)(d), isAdmin, henry)(data);
}
