<?php

/* server/collations/charsets.twig */
class __TwigTemplate_f0f30c0e6b4d6e86a42b4e4dcb3d7622e028d8d79d1bf7e8df7048f5834cfbaf extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        echo "<div id=\"div_mysql_charset_collations\">
    <table class=\"data noclick\">
        <thead>
            <tr>
                <th id=\"collationHeader\">";
        // line 5
        echo _gettext("Collation");
        echo "</th>
                <th>";
        // line 6
        echo _gettext("Description");
        echo "</th>
            </tr>
        </thead>
        ";
        // line 9
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["mysql_charsets"]) ? $context["mysql_charsets"] : null));
        foreach ($context['_seq'] as $context["_key"] => $context["current_charset"]) {
            // line 10
            echo "            <tr>
                <th colspan=\"2\" class=\"right\">
                    ";
            // line 12
            echo twig_escape_filter($this->env, $context["current_charset"], "html", null, true);
            echo "
                    ";
            // line 13
            if ( !twig_test_empty($this->getAttribute((isset($context["mysql_charsets_desc"]) ? $context["mysql_charsets_desc"] : null), $context["current_charset"], array(), "array"))) {
                // line 14
                echo "                        (<em>";
                echo twig_escape_filter($this->env, $this->getAttribute((isset($context["mysql_charsets_desc"]) ? $context["mysql_charsets_desc"] : null), $context["current_charset"], array(), "array"), "html", null, true);
                echo "</em>)
                    ";
            }
            // line 16
            echo "                </th>
            </tr>
            ";
            // line 18
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable($this->getAttribute((isset($context["mysql_collations"]) ? $context["mysql_collations"] : null), $context["current_charset"], array(), "array"));
            foreach ($context['_seq'] as $context["_key"] => $context["current_collation"]) {
                // line 19
                echo "                <tr class=\"";
                echo ((($this->getAttribute((isset($context["mysql_dft_collations"]) ? $context["mysql_dft_collations"] : null), $context["current_charset"], array(), "array") == $context["current_collation"])) ? (" marked") : (""));
                echo "\">
                    <td>";
                // line 20
                echo twig_escape_filter($this->env, $context["current_collation"], "html", null, true);
                echo "</td>
                    <td>";
                // line 21
                echo twig_escape_filter($this->env, PhpMyAdmin\Charsets::getCollationDescr($context["current_collation"]), "html", null, true);
                echo "</td>
                </tr>
            ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['current_collation'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 24
            echo "        ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['current_charset'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 25
        echo "    </table>
</div>
";
    }

    public function getTemplateName()
    {
        return "server/collations/charsets.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  87 => 25,  81 => 24,  72 => 21,  68 => 20,  63 => 19,  59 => 18,  55 => 16,  49 => 14,  47 => 13,  43 => 12,  39 => 10,  35 => 9,  29 => 6,  25 => 5,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("", "server/collations/charsets.twig", "/home/crustaceankeys/public_html/phpmyadmin/templates/server/collations/charsets.twig");
    }
}
