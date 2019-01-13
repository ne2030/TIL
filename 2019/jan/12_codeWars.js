// ADT problems

function zero() { }
function succ(nat) {
    return () => nat
}
function isZero(nat) {
    return !nat()
}

function natToInt(nat) {
    return (function sol(n) {
        n() ? 1 + sol(n()) : 0;
    })(nat);
}

function intToNat(int) {
    return !int ? zero : succ(intToNat(int - 1))
}

function add(nat1, nat2) {
    return nat1() ? add(nat1(), succ(nat2)) : nat2;
}

function add(nat1, nat2) {
    return nat1() ? () => add(nat1(), nat2) : nat2;
}


function mul(nat1, nat2) {
    return !nat1() ? zero :
        isZero(nat1()) ? nat2 :
            add(mul(nat1(), nat2), nat2);
}

function compareTo(nat1, nat2) {
    return !nat1() && !nat2() ? 0 :
        !nat1() && nat2() ? -1 :
            nat1() && !nat2() ? 1 :
                compareTo(nat1(), nat2())
}

function compareTo(nat1, nat2) {

}

function toString(nat) {
    return nat() ? `succ(${toString(nat())})` : 'zero';
}