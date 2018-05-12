// TO-DO - tomorrow
// JS deep
// About Lexcial Environment

// FP - pipe with SE

exports.getRefunds = (rawParams, user) => {
    const isRoleName = options => obj => _.contains(options, obj.roleName);

    const defaultParams = {
        orderBy: 'created desc',
        offset: 0,
        limit: 15,
        from: moment().subtract(1, 'month').format('YYYY-MM-DD'),
        to: moment().format('YYYY-MM-DD')
    };

    const parseParams = _.mapObject((v, key) =>
        func.match(key)
            .case('offset')(() => parseInt(v))
            .case('limit')(() => parseInt(v))
            .case('parkinglotSeq')(() => parseInt(v))
            .case('partnerStatus')(() => parseInt(v))
            .case('isSimple')(() => _.isEqual(v, 'true'))
            .case('orderBy')(() => v.replace(',', ' '))
            .else(() => v)
    );

    const limitParkinglot = p => _.pipe(
        _.val('reserved1'),
        ifElse(p.parkinglotSeq, _.partial(strIntersect, _, p.parkinglotSeq), _.identity),
        strSplit(),
        parkinglotSeq => ({ ...p, parkinglotSeq })
    );

    const limitFromRole = _.pipe(
        ifElse(auth.isModuAdmin(user), _.identity, assignValue('refundStatus', 1)),
        p => func.match(user)
            .case(isRoleName(['총괄', '할인등록자']))(({ companySeq }) => ({ ...p, companySeq }))
            .case(auth.isParkAdmin)((limitParkinglot(p)))
            .else(() => p)
    );

    const parsePagination = ifElse(p => _.isEqual(p.offset, 0), _.omit('pageStart'), _.identity);

    const params = _.go(rawParams,
        omitEmptyKey,
        parseParams,
        limitFromRole,
        parsePagination,
        rawParams => ({ ...defaultParams, ...rawParams })
    );

    const simpleFormat = [
        'id',
        'partnerStatus',
        'created',
        { n: 'user', p: ['carNum'] },
        { n: 'ticket', p: ['name', 'carEntranceDate'] },
        { n: 'parkinglot', p: ['name'] },
        { n: 'reason', p: ['msg', 'id'] },
        { n: 'payment', p: ['paymentDate'] }
    ];

    const simplifyData = _.pipe(
        goIf(() => params.isSimple || auth.isParkAdmin(user)),
        _.map(pickDeepObj(simpleFormat))
    );

    const setPageStart = (offset, pageStart, created) => (isNotEqual(offset, 0) && pageStart ? pageStart : created ? moment(created).format('YYYY-MM-DD HH:mm:ss') : 'none');
    const createPagination = ({ count, created }, { limit, offset, pageStart }) => ({ limit, offset, count: count || 0, pageStart: setPageStart(offset, pageStart, created) });

    return _.go(params,
        model.getRefunds,
        check(),
        ({ list, summary }) => ({ list: simplifyData(list), pagination: createPagination(summary, params) }),
        returnFormatter
    );
};

exports.getRefunds = (params, user) => {
    const isRoleName = options => obj => _.contains(options, obj.roleName);

    const getParams = {
        orderBy: params.orderBy ? params.orderBy.replace(',', ' ') : 'created desc',
        offset: params.offset ? parseInt(params.offset) : 0,
        limit: params.limit ? parseInt(param.limit) : 15,
        from: params.from || moment().subtract(1, 'month').format('YYYY-MM-DD'),
        to: params.to || moment().format('YYYY-MM-DD'),
        parkinglotSeq: params.parkinglotSeq ? parseInt(params.parkinglotSeq) : null,
        partnerStatus: params.partnerStatus ? parseInt(params.partnerStatus) : null,
        isSimple: params.isSimple ? params.isSimple === 'true' : null
    };

    if (req.user.reserved1) {
        getParams.reserved1 = params.parkinglotSeq ? strIntersect(params.parkinglotSeq, req.user.reserved1).split(',') : req.user.reserved1;
    }

    if (auth.isModuAdmin(user)) {
        
    }
    const limitFromRole = _.pipe(
        ifElse(, _.identity, assignValue('refundStatus', 1)),
        p => func.match(user)
            .case(isRoleName(['총괄', '할인등록자']))(({ companySeq }) => ({ ...p, companySeq }))
            .case(auth.isParkAdmin)((limitParkinglot(p)))
            .else(() => p)
    );

    const parsePagination = ifElse(p => _.isEqual(p.offset, 0), _.omit('pageStart'), _.identity);

    const params = _.go(rawParams,
        omitEmptyKey,
        parseParams,
        limitFromRole,
        parsePagination,
        rawParams => ({ ...defaultParams, ...rawParams })
    );

    const simpleFormat = [
        'id',
        'partnerStatus',
        'created',
        { n: 'user', p: ['carNum'] },
        { n: 'ticket', p: ['name', 'carEntranceDate'] },
        { n: 'parkinglot', p: ['name'] },
        { n: 'reason', p: ['msg', 'id'] },
        { n: 'payment', p: ['paymentDate'] }
    ];

    const simplifyData = _.pipe(
        goIf(() => params.isSimple || auth.isParkAdmin(user)),
        _.map(pickDeepObj(simpleFormat))
    );

    const setPageStart = (offset, pageStart, created) => (isNotEqual(offset, 0) && pageStart ? pageStart : created ? moment(created).format('YYYY-MM-DD HH:mm:ss') : 'none');
    const createPagination = ({ count, created }, { limit, offset, pageStart }) => ({ limit, offset, count: count || 0, pageStart: setPageStart(offset, pageStart, created) });

    return _.go(params,
        model.getRefunds,
        check(),
        ({ list, summary }) => ({ list: simplifyData(list), pagination: createPagination(summary, params) }),
        returnFormatter
    );
};

// 1) pagination 관련된 함수들 빼서 공용으로 사용 가능할 듯 - pageStart 관련된 부분만 optional 로 바꿔주기만 하면 될 듯
// 생각보다 공용화할 함수가 없다는 점이 아쉽다. 
// 2) params 를 셋팅한 이후로 한 번도 바뀔일이 없다고 볼 수 있는가?
// 이거는 조회라서 그렇지만 만약에 a 라는 테이블에는 abc 라고 저장해야 하고 b 라는 테이블에는 abc1 이라는 식으로 저장을 해야 한다고 하면 결국에는 params 가 바뀌는거 아닌가?
// 아니면 b 라는 테이블을 다룰때는 다른 함수 혹은 다른 service 를 써야 하니까 상관이 없는가? 하나의 SE 만 발생시키는 것이 맞는가? 혹은 만약에 현재 db 의 데이터를 조회한 다음 params 에 더해서
// 새로운 데이터를 넣어야 한다면 params 는 바뀌는가? 아니면 이거는 조회용 param 이랑 저장용 param 을 따로 두어야 하는 문제인가?
