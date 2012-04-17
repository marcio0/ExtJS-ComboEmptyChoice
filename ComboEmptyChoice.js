/**
 * The author disclaims copyright to this source code. In place of
 * a legal notice, here is a blessing:
 *
 * May you do good and not evil.
 * May you find forgiveness for yourself and forgive others.
 * May you share freely, never taking more than you give.
 */

Ext.define('Ext.ux.plugin.ComboEmptyChoice', {
    extend: 'Ext.AbstractPlugin',
    
    init: function(combo){
        var me = this;
        combo.clearOption = combo.clearOption || '<i>Clear</i>';
        combo.setValue = this._setValue;
        
        if(combo.getStore()){
            combo.getStore().on('load', function(s, r, ok, op, eop){
                me.storeLoad(s, r, ok, op, eop, combo);
            });
        }
    },
    
    /*
     * Creates a dummy instance of the store's model to act as the blank option.
     */
    storeLoad: function(s, r, ok, op, eop, combo){
        var config = {};
        config[combo.displayField] = combo.clearOption;
        config[combo.valueField] = -1;
        
        var model = Ext.create(s.model, config);
        s.add(model);
    },

    /*
     * If the choosen option was the blank one, clears the combobox.
     */
    _setValue: function(value){
        if(!value){
            return;
        }
        if(!(value instanceof Array)){
            value = [value];
        }
        if(value[0].data[this.valueField] == -1){
            return Ext.form.field.ComboBox.prototype.setValue.apply(this, []);
        }
        return Ext.form.field.ComboBox.prototype.setValue.apply(this, value);
    }
});
